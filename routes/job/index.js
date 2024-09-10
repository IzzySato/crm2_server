'use strict';
const express = require('express');
const { authenticateJWT } = require('../../middlewares/auth');
const {
  getJobs,
  getJobById,
  addJob,
  updateJob,
} = require('../../database/engine/jobs');
const jobResultSchema = require('../../schemas/jobResultSchema');
const { validateInputs } = require('../../validation');
const NotFoundError = require('../../errors/NotFoundError');
const { JOB_NOT_FOUND } = require('../../constants/errorMessage');
const { REQUIRED_FIELDS } = require('../../constants/requiredFields');
const router = express.Router();

router.get('/', authenticateJWT, async (req, res, next) => {
  try {
    const query = req.query;
    const { data, total } = await getJobs(query, { isCache: true });
    res.json({
      total,
      length: query.length || 10,
      pageNum: query.pageNum || 1,
      sortBy: query.sortBy || '_id',
      data: data.map(jobResultSchema),
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', authenticateJWT, async (req, res) => {
  try {
    const id = req.params.id;
    const result = await getJobById(id);
    if (!result) {
      throw new NotFoundError(JOB_NOT_FOUND);
    }
    res.json(jobResultSchema(result));
  } catch (error) {
    next(error);
  }
});

router.post('/', authenticateJWT, async (req, res, next) => {
  try {
    const job = req.body;
    const requiredFiels = REQUIRED_FIELDS.JOB;
    validateInputs({
      requiredFiels,
      bodyData: job
    });
    const data = await addJob(job);
    res.json({
      total: data.length,
      data: data.map(jobResultSchema)
    });
  } catch (error) {
    next(error);
  }
});

router.put('/:id', authenticateJWT, async (req, res, next) => {
  try {
    const id = req.params.id;
    const updateObj = req.body;
    const result = await updateJob(id, updateObj);
    if (!result) {
      throw new NotFoundError(JOB_NOT_FOUND);
    }
    res.json(jobResultSchema(result));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
