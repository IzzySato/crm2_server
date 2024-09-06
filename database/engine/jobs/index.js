'use strict';
const { getDatabaseQuery } = require('../../../utils/getQuery');
const handleDatabaseOperation = require('../../../utils/handleDatabaseOperation');
const { JobModel } = require('../../models/Job');
const { convertIdStringToObjectId } = require('../utils/convertObjectId');

/**
 * handleDatabaseOperation is handling errors
 * add a new job | add new jobs
 * @param {*} job Object or Array
 * @returns { total: number, data: Job[] }
 */
const addJob = async (job) => {
  return handleDatabaseOperation(async () => {
    if (Array.isArray(job)) {
      job = job.map((j) => {
        return {
          ...j,
          customerId: j.customerId
            ? convertIdStringToObjectId(j.customerId)
            : null,
          companyId: j.companyId
            ? convertIdStringToObjectId(j.companyId)
            : null,
          products:
            j.products.length > 0
              ? j.products.map((j) => convertIdStringToObjectId(j))
              : [],
        };
      });
    } else {
      job = {
        ...job,
        customerId: job.customerId
          ? convertIdStringToObjectId(job.customerId)
          : null,
        companyId: job.companyId
          ? convertIdStringToObjectId(job.companyId)
          : null,
        products:
          job.products.length > 0
            ? job.products.map((j) => convertIdStringToObjectId(j))
            : [],
      };
    }
    return await JobModel.insertMany(job);
  });
};

/**
 * handleDatabaseOperation is handling errors
 * update a job or soft delete a job
 * @param {*} _id string job id
 * @param {*} updateField Object e.g. { note: string }
 * @returns updated job object
 */
const updateJob = async (_id, updateField) => {
  return handleDatabaseOperation(
    async () =>
      await JobModel.findOneAndUpdate({ _id }, updateField, {
        returnDocument: 'after',
      })
  );
};

/**
 * handleDatabaseOperation is handling errors
 * get jobs for a page
 * params.fields should be database fiels string e.g. 'jobType note state'
 * @param { pageNum: number, length: number, sortBy: string, fields: string, searchBy: string}
 * @param { isCache: boolean }
 * @returns
 */
const getJobs = async (params, { isCache = false }) => {
  return handleDatabaseOperation(async () => {
    const filterByArray = ['jobType', 'state', 'note'];
    return await getDatabaseQuery({
      model: JobModel,
      params,
      filterByArray,
      isCache,
    });
  });
};

/**
 * handleDatabaseOperation is handling errors
 * Get a Job by job id
 * @param {*} id job id
 * @returns Job object
 */
const getJobById = async (_id) => {
  return handleDatabaseOperation(async () => await JobModel.findOne({ _id }));
};

module.exports = { addJob, getJobById, getJobs, updateJob };
