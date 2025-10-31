const router = require('express').Router();
const Visit = require('../models/Visit');

router.post('/', async (req, res) => {
  const { path, referrer, ua } = req.body || {};
  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket?.remoteAddress;
  await Visit.create({ path, referrer, ua: ua || req.headers['user-agent'], ip });
  res.json({ ok: true });
});

module.exports = router;
