'use strict';
const { describe, expect, test } = require('@jest/globals');
const { setup } = require('../../../../testUtils/setup');
const { addProduct, getProductById, getProducts, updateProduct } = require('../..');
const { productSampleData } = require('../../../../testUtils/testData/productData');
const { ProductModel } = require('../../../../models/Product');

afterAll(async () => {
  await setup.afterAll();
});
beforeEach(async () => {
  await ProductModel.deleteMany({});
});

describe('Get Product', () => {
  test('get product by id', async () => {
    const productObject = productSampleData[0];
    const addedProduct = await ProductModel.create(productObject);
    const id = addedProduct._id.toString();
    const result = await getProductById(id);
    expect(result.name).toBe(productObject.name);
  });

  test('get product using default params', async () => {
    // setup
    const productArray = productSampleData;
    const addedProducts = await ProductModel.insertMany(productArray);
    expect(addedProducts.length).toBe(4);
    // Filtered out if deletedAt is not null
    const result = await getProducts({}, { isCache: false });
    expect(result.data.length).toBe(3);
    expect(result.data[0].name).toBe(productSampleData[0].name);
  });

  test('get products with sortBy params', async () => {
    // setup
    const productArray = productSampleData;
    const addedProducts = await ProductModel.insertMany(productArray);
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

  test('get products with sortBy params', async () => {
    // setup
    const productArray = productSampleData;
    const addedProducts = await ProductModel.insertMany(productArray);
    expect(addedProducts.length).toBe(4);
    // Filtered out if deletedAt is not null
    const result = await getProducts({
      pageNum: 1,
      length: 10,
      sortBy: '',
      fields: '',
      searchBy: '1x4 Fir Floor'
    }, { isCache: false });
    expect(result.data.length).toBe(1);
    expect(result.data[0].name).toBe('1x4 Fir Floor');
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
    const addedProduct = await ProductModel.create(productObject);
    const id = addedProduct._id.toString();
    const result = await updateProduct(id, { name: 'Test' });
    expect(result.name).toBe('Test');
  });

  test('soft delete product', async () => {
    const productObject = productSampleData[0];
    const addedProduct = await ProductModel.create(productObject);
    const id = addedProduct._id.toString();
    const today = new Date();
    const result = await updateProduct( id, { deletedAt: today });
    expect(result.deletedAt).not.toBe(null);
  });

  test('should throw a ValidationError for an invalid ID format', async () => {
    const invalidId = '123';
    await expect(updateProduct(invalidId, { name: 'Test' })).rejects.toThrow(
      'Invalid ID format'
    );
  });
});
