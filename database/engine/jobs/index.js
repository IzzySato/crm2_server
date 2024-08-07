'use strict';
const logger = require('../../../lib/logger');
const Job = require('../../models/Job');
const { convertIdStringToObjectId } = require('../utils/convertObjectId');

/**
 * add a new job
 * @param {*} job Object or array
 * @returns { total: number, data: Job[] }
 */
const addJob = async (job) => {
  try {
    if (Array.isArray(job)) {
      job = job.map((j) => {
        return {
          ...j,
          customerId: convertIdStringToObjectId(j.customerId),
          companyId: convertIdStringToObjectId(j.companyId),
          products: job.map((j) => convertIdStringToObjectId(j)),
        };
      });
    } else {
      job = {
        ...job,
        customerId: convertIdStringToObjectId(j.customerId),
        companyId: convertIdStringToObjectId(j.companyId),
        products: job.map((j) => convertIdStringToObjectId(j)),
      };
    }
    const data = await Job.insertMany(job);
    return {
      total: data.length,
      data,
    };
  } catch (error) {
    logger.error(error.toString());
  }
};

/**
 * update a job or soft delete a job
 * @param {*} _id string job id
 * @param {*} updateField Object e.g. { note: string }
 * @returns
 */
const updateJob = async (_id, updateField) => {
  try {
    return await Job.findOneAndUpdate({ _id }, updateField, { returnDocument: 'after'});
  } catch (error) {
    logger.error(error.toString());
  }
};

/**
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
  try {
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
    const baseQuery = Job.where({ deletedAt: null }).find(findObj);
    const total = await Job.where({ deletedAt: null })
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
  } catch (error) {
    logger.error(error.toString());
  }
};

/**
 * Get a Job by id obj
 * @param {*} obj e.g. { _id: id } or { customerId: id }
 * @param {*} param1 { isCache = false }
 * @returns
 */
const getJobById = async (obj, { isCache = false }) => {
  try {
    return isCache ? await Job.findOne(obj).cache(id) : await Job.findOne(obj);
  } catch (error) {
    logger.error(error.toString());
  }
};

module.exports = { addJob, getJobById, getJobs, updateJob };
