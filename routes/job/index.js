'use strict';
const express = require('express');
const { authenticateJWT } = require('../../middlewares/auth');
const {
  getJobs,
  getJobById,
  addJob,
  updateJob,
} = require('../../database/engine/jobs');
const router = express.Router();

router.get('/', authenticateJWT, async (req, res) => {
  const query = req.query;
  const { data, total } = await getJobs(query, { isCache: true });
  res.json({
    total,
    length: query.length || 10,
    pageNum: query.pageNum || 1,
    sortBy: query.sortBy || '_id',
    data,
  });
});

router.get('/:id', authenticateJWT, async (req, res) => {
  const id = req.params.id;
  const result = await getJobById(id);
  if (!result) {
    return res.status(404).json({ message: `Job ${req.params.id} not found` });
  }
  res.json(result);
});

router.post('/', authenticateJWT, async (req, res) => {
  const job = req.body;
  const result = await addJob(job);
  res.json(result);
});

router.put('/:id', authenticateJWT, async (req, res) => {
  const updateObj = req.body;
  const result = await updateJob(req.params.id, updateObj);
  if (!result) {
    return res.status(404).json({ message: `Job ${req.params.id} not found` });
  }
  res.json(result);
});

module.exports = router;
