const router = require('express').Router();
const auth = require('../middleware/auth');
const Interaction = require('../models/Interaction');

router.post('/', async (req, res) => {
  const { query, suggestions = [], chosenTourId = null, fromWidget = false } = req.body || {};
  if (!query) return res.status(400).json({ error: 'missing_query' });
  const item = await Interaction.create({ query, suggestions, chosenTourId, fromWidget });
  res.json(item);
});

router.get('/', auth, async (req, res) => {
  const items = await Interaction.find({}).sort({ ts: -1 }).limit(500);
  res.json(items);
});

module.exports = router;
