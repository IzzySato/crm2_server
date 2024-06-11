const express = require('express');
const { getAddressById, addAddresses, addAddress } = require('../../database/engine/address/index');
const router = express.Router();
const cleanCache = require('../../middlewares/cleanCache');

router.get('/', async (req, res, next) => {
  const data = [];
  res.json({ data });
});

router.get('/:id', async (req, res, next) => {
  const data = await getAddressById(req.params.id);
  res.json({ data });
});

router.post('/', cleanCache, async (req, res, next) => {
  const data = await addAddress(req.body);
  res.json({ data });
});

router.post('/add-all', cleanCache, async (req, res, next) => {
  const data = await addAddresses(req.body);
  res.json({ data });
});

module.exports = router;