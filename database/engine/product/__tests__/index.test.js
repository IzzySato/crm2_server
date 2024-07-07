'use strict';
const { describe, expect, test } = require('@jest/globals');
const { setup } = require('../../../testSetUp/setup');
const Product = require('../../../models/Product');
const { addProduct, getProductById, getProducts, updateProduct } = require('..');
const { productSampleData } = require('../../../testSetUp/testData/productData');

beforeAll(setup.beforeAll);
afterAll(setup.afterAll);
afterEach(() => {
  return new Promise(async (resolve, reject) => {
    try {
      await Product.deleteMany({});
      resolve();
    } catch (error) {
      reject(error);
    }
  });
});

describe('Get Product', () => {
  test('get product by id', async () => {
    const addedProduct = await addProduct(productSampleData[0]);
    const id = addedProduct.data[0]._id.toString();
    const result = await getProductById(id, { isCache: false });
    expect(result.name).toBe(productSampleData[0].name);
  });

  test('get products', async () => {
    const addedProducts = await addProduct(productSampleData);
    expect(addedProducts.total).toBe(4);
    // Filtered out if deletedAt is not null
    // Default to return first 10
    const result = await getProducts({}, { isCache: false });
    expect(result.data.length).toBe(3);
    expect(result.data[0].name).toBe(productSampleData[0].name);
  });

  test('get products with params', async () => {
    const addedProducts = await addProduct(productSampleData);
    expect(addedProducts.total).toBe(4);
    // Filtered out if deletedAt is not null
    const result = await getProducts({
      pageNum: 1,
      length: 10,
      sortBy: 'name',
      fields: ''
    }, { isCache: false });
    expect(result.data.length).toBe(3);
    expect(result.data[0].name).toBe(productSampleData[1].name);
  });
});

describe('Create Product', () => {
  // passing a product object
  test('add a product', async () => {
    const result = await addProduct(productSampleData[0]);
    expect(result.total).toBe(1);
    expect(result.data[0].name).toBe(productSampleData[0].name);
    expect(result.data[0].sku).toBe(productSampleData[0].sku);
  });
  // passing a product array
  test('add a product array', async () => {
    const result = await addProduct(productSampleData);
    expect(result.total).toBe(4);
    expect(result.data[0].name).toBe(productSampleData[0].name);
    expect(result.data[0].sku).toBe(productSampleData[0].sku);
  });
});

describe('Update Product', () => {
  test('update a product', async () => {
    const addedProduct = await addProduct(productSampleData[0]);
    const id = addedProduct.data[0]._id.toString();
    const result = await updateProduct(id, { name: 'Test' });
    expect(result.name).toBe('Test');
  });

  test('soft delete product', async () => {
    const addedProduct = await addProduct(productSampleData[0]);
    const id = addedProduct.data[0]._id.toString();
    const today = new Date();
    const result = await updateProduct( id, { deletedAt: today });
    expect(result.deletedAt).not.toBe(null);
  });
});
