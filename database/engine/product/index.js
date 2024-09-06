'use strict';
const { deleteImage } = require('../../../lib/s3');
const { getDatabaseQuery } = require('../../../utils/getQuery');
const handleDatabaseOperation = require('../../../utils/handleDatabaseOperation');
const { ProductModel } = require('../../models/Product');
const { convertIdStringToObjectId } = require('../utils/convertObjectId');

/**
 * handleDatabaseOperation is handling errors
 * Insert Products
 * @param {*} products array of products or product object
 * @return array of users
 */
const addProduct = async (products) => {
  return handleDatabaseOperation(async () => {
    if (Array.isArray(products)) {
      products = products.map((product) => ({
        ...product,
        companyId: product.companyId
          ? convertIdStringToObjectId(product.companyId)
          : null,
      }));
    } else {
      products = {
        ...products,
        companyId: products.companyId
          ? convertIdStringToObjectId(products.companyId)
          : null,
      };
    }
    return await ProductModel.insertMany(products);
  });
};

/**
 * handleDatabaseOperation is handling errors
 * @param {*} _id string
 * @param {*} isCache boolean
 * @returns product object with the id
 */
const getProductById = async (_id) => {
  return handleDatabaseOperation(
    async () => await ProductModel.findOne({ _id })
  );
};

/**
 * handleDatabaseOperation is handling errors
 * params.field e.g. 'name sku categoryTags description'
 * params.sortBy e.g. '_id'
 * @param { pageNum: number, length: number, sortBy: string, fields: string, searchBy: string }
 * @param { isCache: boolean }
 * @returns { total, data } total non filtered products number and filtered product data
 */
const getProducts = async (params, { isCache = false }) => {
  return handleDatabaseOperation(async () => {
    const filterByArray = ['name', 'sku', 'categoryTags', 'description'];
    return await getDatabaseQuery({
      model: ProductModel,
      params,
      filterByArray,
      isCache,
    });
  });
};

/**
 * handleDatabaseOperation is handling errors
 * @param {*} _id string product id
 * @param {*} updateField object of product field
 * @returns updated product object
 */
const updateProduct = async (_id, updateField) => {
  return handleDatabaseOperation(async () => {
    if (updateField.deletedAt) {
      const product = await ProductModel.findById(_id);
      if (product.imageUrl !== '') {
        deleteImage(product.imageUrl);
      }
      updateField.imageUrl = '';
    }
    return await ProductModel.findOneAndUpdate({ _id }, updateField, {
      returnDocument: 'after',
    });
  });
};

module.exports = {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
};
