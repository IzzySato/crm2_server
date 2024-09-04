'use strict';
const { describe, expect, test } = require('@jest/globals');
const { setup } = require('../../../testUtils/setup');
const Product = require('../../../models/Product');
const { addProduct, getProductById, getProducts, updateProduct } = require('..');
const { productSampleData } = require('../../../testUtils/testData/productData');

beforeAll(setup.beforeAll);
afterAll(setup.afterAll);
beforeEach(async () => {
  await Product.deleteMany({});
});

describe('Get Product', () => {
  test('get product by id', async () => {
    const productObject = productSampleData[0];
    const addedProduct = await addProduct(productObject);
    const id = addedProduct[0]._id.toString();
    const result = await getProductById(id, { isCache: false });
    expect(result.name).toBe(productSampleData[0].name);
  });

  test('get products', async () => {
    // setup
    const productArray = productSampleData;
    const addedProducts = await addProduct(productArray);
    expect(addedProducts.length).toBe(4);
    // Filtered out if deletedAt is not null
    // Default to return first 10
    const result = await getProducts({}, { isCache: false });
    expect(result.data.length).toBe(3);
    expect(result.data[0].name).toBe(productSampleData[0].name);
  });

  test('get products with params', async () => {
    // setup
    const productArray = productSampleData;
    const addedProducts = await addProduct(productArray);
    expect(addedProducts.length).toBe(4);
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
    const productObject = productSampleData[0];
    const result = await addProduct(productObject);
    expect(result.length).toBe(1);
    expect(result[0].name).toBe(productSampleData[0].name);
    expect(result[0].sku).toBe(productSampleData[0].sku);
  });
  // passing a product array
  test('add a product array', async () => {
    const productArray = productSampleData;
    const result = await addProduct(productArray);
    expect(result.length).toBe(4);
    expect(result[0].name).toBe(productSampleData[0].name);
    expect(result[0].sku).toBe(productSampleData[0].sku);
  });
});

describe('Update Product', () => {
  test('update a product', async () => {
    const productObject = productSampleData[0];
    const addedProduct = await addProduct(productObject);
    const id = addedProduct[0]._id.toString();
    const result = await updateProduct(id, { name: 'Test' });
    expect(result.name).toBe('Test');
  });

  test('soft delete product', async () => {
    const productObject = productSampleData[0];
    const addedProduct = await addProduct(productObject);
    const id = addedProduct[0]._id.toString();
    const today = new Date();
    const result = await updateProduct( id, { deletedAt: today });
    expect(result.deletedAt).not.toBe(null);
  });
});
