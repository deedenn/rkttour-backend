const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Manager = require('../models/Manager');
const { JWT_SECRET } = require('../config');

router.post('/login', async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'missing_credentials' });
  const mgr = await Manager.findOne({ email });
  if (!mgr) return res.status(401).json({ error: 'invalid_credentials' });
  const ok = await bcrypt.compare(password, mgr.passwordHash);
  if (!ok) return res.status(401).json({ error: 'invalid_credentials' });
  const token = jwt.sign({ uid: mgr._id, email: mgr.email }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, manager: { email: mgr.email } });
});

module.exports = router;
