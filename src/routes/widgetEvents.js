const router = require('express').Router();
const auth = require('../middleware/auth');
const WidgetEvent = require('../models/WidgetEvent');
const Interaction = require('../models/Interaction');
const Application = require('../models/Application');
const { deepText, findLead } = require('../utils/extract');

router.post('/', async (req, res) => {
  const { origin, data } = req.body || {};
  if (!origin) return res.status(400).json({ error: 'missing_origin' });
  await WidgetEvent.create({ origin, data });
  const text = deepText(data);
  if (text) await Interaction.create({ query: String(text).slice(0, 4000), fromWidget: true });
  const lead = findLead(data);
  if (lead) await Application.create(lead);
  res.json({ ok: true });
});

router.get('/', auth, async (req, res) => {
  const items = await WidgetEvent.find({}).sort({ ts: -1 }).limit(200);
  res.json(items);
});

module.exports = router;
