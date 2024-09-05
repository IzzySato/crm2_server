'use strict';
const { describe, test, expect } = require('@jest/globals');
const request = require('supertest');
const {
  setup,
  addUserGetToken,
} = require('../../../../database/testUtils/setup');
const {
  jobSampleData,
} = require('../../../../database/testUtils/testData/jobData');
const app = require('../../../../app');
const { JobModel } = require('../../../../database/models/Job');
const { UserModel } = require('../../../../database/models/User');

beforeAll(() => {
  setup.turnOffCache();
});
afterAll(async () => {
  await setup.afterAll();
});
beforeEach(async () => {
  await JobModel.deleteMany({});
  await UserModel.deleteMany({});
});

describe('GET Job routes', () => {
  test('GET /job return status 200', async () => {
    const token = await addUserGetToken();
    await request(app)
      .get('/job')
      .set('authorization', `Bearer ${token}`)
      .expect(200);
  });

  test('GET /job/:id return the correct data', async () => {
    const job = await JobModel.create(jobSampleData[0]);
    const token = await addUserGetToken();
    const response = await request(app)
      .get(`/job/${job._id.toString()}`)
      .set('authorization', `Bearer ${token}`)
      .expect(200);
    expect(response.body).toHaveProperty('id', job._id.toString());
    expect(response.body).toHaveProperty('jobType', job.jobType);
  });
});

describe('PUT Job routes', () => {
  test('PUT /job/:id', async () => {
    const job = await JobModel.create(jobSampleData[0]);
    expect(job.jobType).toBe('Home Improvments');
    const token = await addUserGetToken();
    const response = await request(app)
      .put(`/job/${job._id.toString()}`)
      .set('authorization', `Bearer ${token}`)
      .send({ jobType: 'Kitchen Renovation' })
      .set('Accept', 'application/json');
    expect(response.status).toBe(200);
    const updatedJob = await JobModel.findById(job._id);
    expect(updatedJob.jobType).toBe('Kitchen Renovation');
  });
});
