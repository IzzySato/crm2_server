'use strict';
const logger = require('../../../lib/logger');
const { deleteImage } = require('../../../lib/s3');
const Product = require('../../models/Product');
const { convertIdStringToObjectId } = require('../utils/convertObjectId');

/**
 * Insert Products
 * @param {*} products array of products or product object
 * @return { total: number, data: [Product] }
 */
const addProduct = async (products) => {
  try {
    if (Array.isArray(products)) {
      products = products.map((product) => ({
        ...product,
        companyId: convertIdStringToObjectId('5063114bd386d8fadbd6b004'),
      }));
    } else {
      products = {
        ...products,
        companyId: convertIdStringToObjectId('5063114bd386d8fadbd6b004'),
      };
    }
    const data = await Product.insertMany(products);
    return {
      total: data.length,
      data,
    };
  } catch (error) {
    logger.error(error.toString());
  }
};

const getProductById = async (id, { isCache = false }) => {
  try {
    return isCache
      ? await Product.findOne({ _id: id }).cache(id)
      : await Product.findOne({ _id: id });
  } catch (error) {
    logger.error(error.toString());
  }
};

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
  try {
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
    const baseQuery = Product.where({ deletedAt: null }).find(findObj);
    const total = await Product.where({ deletedAt: null })
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
  } catch (error) {
    logger.error(error.toString());
  }
};

const updateProduct = async (_id, updateField) => {
  try {
    if (updateField.deletedAt) {
      const product = await Product.findById(_id);
      if (product.imageUrl !== '') {
        deleteImage(product.imageUrl);
      }
      updateField.imageUrl = ''
    }
    return await Product.findOneAndUpdate({ _id }, updateField, {
      returnDocument: 'after',
    });
  } catch (error) {
    logger.error(error.toString());
  }
};

module.exports = {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
};
