'use strict';
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
 * @param { pageNum: number, length: number, sortBy: string, fields: string, searchBy: string} param0
 * @param { isCache: boolean } param1
 * @returns
 */
const getJobs = async (
  {
    pageNum = 1,
    length = 10,
    sortBy = '_id',
    fields = 'jobType note state startDate endDate customerId products',
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
              { jobType: { $regex: searchBy, $options: 'i' } },
              { state: { $regex: searchBy, $options: 'i' } },
              { products: { $regex: searchBy, $options: 'i' } },
              { startDate: { $regex: searchBy, $options: 'i' } },
              { endDate: { $regex: searchBy, $options: 'i' } },
              { note: { $regex: searchBy, $options: 'i' } },
            ],
          };
    const baseQuery = JobModel.where({ deletedAt: null }).find(findObj);
    const total = await JobModel.where({ deletedAt: null })
      .find(findObj)
      .countDocuments();
    const query = baseQuery
      .skip((parseInt(pageNum) - 1) * parseInt(length))
      .sort(sortBy)
      .limit(parseInt(length))
      .select(fields);
    if (isCache) {
      const data = await query.cache(
        `Job_${searchBy}_${pageNum}_${fields}_${length}_${sortBy}`
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
 * Get a Job by job id
 * @param {*} id job id
 * @returns Job object
 */
const getJobById = async (_id) => {
  return handleDatabaseOperation(async () => await JobModel.findOne({ _id }));
};

module.exports = { addJob, getJobById, getJobs, updateJob };
