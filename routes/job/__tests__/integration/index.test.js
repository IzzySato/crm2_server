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

let token = '';
let authUserId = '';

beforeAll(async () => {
  setup.turnOffCache();
  const result = await addUserGetToken();
  token = result.token;
  authUserId = result.userId
});
afterAll(async () => {
  await setup.afterAll();
});
beforeEach(async () => {
  await JobModel.deleteMany({});
  await UserModel.deleteOne({ _id: authUserId });
});

describe('GET Job routes', () => {
  test('GET /job return status 200', async () => {
    await request(app)
      .get('/job')
      .set('authorization', `Bearer ${token}`)
      .expect(200);
  });

  test('GET /job/:id return the correct data', async () => {
    const job = await JobModel.create(jobSampleData[0]);
    const response = await request(app)
      .get(`/job/${job._id.toString()}`)
      .set('authorization', `Bearer ${token}`)
      .expect(200);
    expect(response.body).toHaveProperty('id', job._id.toString());
    expect(response.body).toHaveProperty('jobType', job.jobType);
  });
});

describe('POST Job routes', () => {
  test('POST /job', async () => {
    const newJob = {
      jobType: 'home reno_2',
      note: 'small project 2',
      state: 'NOT_COMPLETED',
      startDate: '1718475505201',
      endDate: '1718475608029',
      customerId: '666f90174d8aedf1a3e6cf15',
      products: [],
      companyId: '',
    };
    const response = await request(app)
      .post('/job')
      .set('authorization', `Bearer ${token}`)
      .send(newJob)
      .set('Accept', 'application/json')
      .expect(200);

    expect(response.body.total).toBe(1);
    expect(response.body.data[0].jobType).toBe(newJob.jobType);
  });

  test('POST /job missing required body field', async () => {
    const newJob = {
      note: 'small project 2',
      startDate: '1718475505201',
      endDate: '1718475608029',
      customerId: '666f90174d8aedf1a3e6cf15',
      products: [],
      companyId: '',
    };
    const response = await request(app)
      .post('/job')
      .set('authorization', `Bearer ${token}`)
      .send(newJob)
      .set('Accept', 'application/json')
      .expect(400);
    expect(response.body.status).toEqual('fail');
  });
});

describe('PUT Job routes', () => {
  test('PUT /job/:id', async () => {
    const job = await JobModel.create(jobSampleData[0]);
    expect(job.jobType).toBe('Home Improvments');
    const response = await request(app)
      .put(`/job/${job._id.toString()}`)
      .set('authorization', `Bearer ${token}`)
      .send({ jobType: 'Kitchen Renovation' })
      .set('Accept', 'application/json');
    expect(response.status).toBe(200);
    const updatedJob = await JobModel.findById(job._id);
    expect(updatedJob.jobType).toBe('Kitchen Renovation');
  });

  test('PUT /job/:id invalid job id', async () => {
    const invalidAddressId = 'invalid_job_id';
    await request(app)
      .put(`/job/${invalidAddressId}`)
      .send({ note: 'new note' })
      .set('Accept', 'application/json')
      .set('authorization', `Bearer ${token}`)
      .expect(400);
  });

  test('PUT /job/:id not exist job id', async () => {
    const notExistId = '66d8d38041c908d46609a388';
    await request(app)
      .put(`/job/${notExistId}`)
      .send({ note: 'new note' })
      .set('Accept', 'application/json')
      .set('authorization', `Bearer ${token}`)
      .expect(404);
  });
});
