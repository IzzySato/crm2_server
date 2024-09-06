'use strict';
const { describe, expect, test } = require('@jest/globals');
const { setup } = require('../../../../testUtils/setup');
const { JobModel } = require('../../../../models/Job');
const { jobSampleData } = require('../../../../testUtils/testData/jobData');
const { getJobById, getJobs, addJob, updateJob } = require('../..');

afterAll(async () => {
  await setup.afterAll();
});
beforeEach(async () => {
  await JobModel.deleteMany({});
});

describe('Get Job', () => {
  test('get jobs with length', async () => {
    const jobArray = jobSampleData;
    const createdJobs = await JobModel.insertMany(jobArray);
    expect(createdJobs.length).toBe(4);
    const result = await getJobs(
      {
        pageNum: 1,
        length: 2,
        sortBy: '_id',
        fields: 'jobType note state startDate endDate customerId products',
        searchBy: '',
      },
      { isCache: false }
    );
    expect(result.total).toBe(4);
    expect(result.data.length).toBe(2);
  });

  test('get jobs with searchBy', async () => {
    const jobArray = jobSampleData;
    const createdJobs = await JobModel.insertMany(jobArray);
    expect(createdJobs.length).toBe(4);
    const result = await getJobs(
      {
        pageNum: 1,
        length: 10,
        sortBy: '_id',
        fields: 'jobType note state startDate endDate customerId products',
        searchBy: 'Designing',
      },
      { isCache: false }
    );
    expect(result.data.length).toBe(2);
    expect(result.total).toBe(4);
  });

  test('get job by job id', async () => {
    const jobObject = jobSampleData[0];
    const createdJob = await JobModel.create(jobObject);
    const result = await getJobById(createdJob._id.toString());
    expect(result.jobType).toBe(jobObject.jobType);
    expect(result.state).toBe(jobObject.state);
  });

  test('should throw a ValidationError for an invalid ID format', async () => {
    const invalidId = '123';
    await expect(getJobById(invalidId)).rejects.toThrow('Invalid ID format');
  });
});

describe('Add Job', () => {
  test('Add a job object', async () => {
    const jobObject = jobSampleData[0];
    const result = await addJob(jobObject);
    expect(result.length).toBe(1);
    expect(result[0].jobType).toBe(jobObject.jobType);
  });

  test('Add job Array', async () => {
    const jobArray = jobSampleData;
    const result = await addJob(jobArray);
    expect(result.length).toBe(4);
  });
});

describe('Update Job', () => {
  test('Update a job', async () => {
    const jobObject = jobSampleData[0];
    const createdJob = await JobModel.create(jobObject);
    expect(createdJob.jobType).toBe('Home Improvments');
    const result = await updateJob(createdJob._id.toString(), {
      jobType: 'New Job Type',
    });
    expect(result.jobType).toBe('New Job Type');
    const databaseJob = await JobModel.findById(createdJob._id.toString());
    expect(databaseJob.jobType).toBe('New Job Type');
  });
  test('should throw a ValidationError for an invalid ID format', async () => {
    const invalidId = '123';
    await expect(
      updateJob(invalidId, { jobType: 'New Job Type' })
    ).rejects.toThrow('Invalid ID format');
  });
});
