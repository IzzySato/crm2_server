'use strict';
const express = require('express');
const { getJobs, getJobById, addJob, updateJob } = require('../../database/engine/jobs');
const router = express.Router();

router.get('/', async (req, res) => {
  const query = req.query;
  const { data, total } = await getJobs(query, { isCache: true });
  res.json({
    total,
    length: query.length || 10,
    pageNum: query.pageNum || 1,
    sortBy: query.sortBy || '_id',
    data
  });
});

router.get('/:id', async (req, res) => {
  const _id = req.params.id;
  const result = await getJobById({ _id }, { isCache: true });
  res.json(result);
});

router.get('/customer/:id', async (req, res) => {
  const id = req.params.id;
  const result = await getJobById({ customerId: id }, { isCache: true });
  res.json(result);
});

router.post('/', async (req, res) => {
  const job = req.body;
  const result = await addJob(job);
  res.json(result);
});

router.put('/:id', async (req, res) => {
  const updateObj = req.body;
  const result = await updateJob(req.params.id, updateObj );
  res.json(result);
});


module.exports = router;