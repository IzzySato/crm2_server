'use strict';
const { deleteImage } = require('../../../lib/s3');
const handleDatabaseOperation = require('../../../utils/handleDatabaseOperation');
const { ProductModel } = require('../../models/Product');
const { convertIdStringToObjectId } = require('../utils/convertObjectId');

/**
 * handleDatabaseOperation is handling errors
 * Insert Products
 * @param {*} products array of products or product object
 * @return { total: number, data: [Product] }
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
 * @returns
 */
const getProductById = async (_id) => {
  return handleDatabaseOperation(async () => await ProductModel.findOne({ _id }));
};

/**
 * handleDatabaseOperation is handling errors
 * @param {*} param0 params
 * @param {*} param1 cache
 * @returns products array
 */
const getProducts = async (
  {
    pageNum = 1,
    length = 10,
    sortBy = '_id',
    fields = 'name sku categoryTags description',
    searchBy = '',
  },
  { isCache = false }
) => {
  return handleDatabaseOperation(async () => {
    const findObj =
      searchBy === ''
        ? {}
        : {
            $or: [
              { name: { $regex: searchBy, $options: 'i' } },
              { sku: { $regex: searchBy, $options: 'i' } },
              { categoryTags: { $regex: searchBy, $options: 'i' } },
              { description: { $regex: searchBy, $options: 'i' } },
            ],
          };
    const baseQuery = ProductModel.where({ deletedAt: null }).find(findObj);
    const total = await ProductModel.where({ deletedAt: null })
      .find(findObj)
      .countDocuments();
    const query = baseQuery
      .skip((parseInt(pageNum) - 1) * parseInt(length))
      .sort(sortBy)
      .limit(parseInt(length))
      .select(fields);
    if (isCache) {
      const data = await query.cache(
        `products_${searchBy}_${pageNum}_${fields}_${length}_${sortBy}`
      );
      return { data, total };
    } else {
      const data = await query;
      return { data, total };
    }
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
