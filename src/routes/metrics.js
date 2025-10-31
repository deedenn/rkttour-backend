const router = require('express').Router();
const auth = require('../middleware/auth');
const Visit = require('../models/Visit');
const Interaction = require('../models/Interaction');
const Application = require('../models/Application');
const WidgetEvent = require('../models/WidgetEvent');

router.get('/summary', auth, async (req, res) => {
  const [visits, interactions, applications, events] = await Promise.all([
    Visit.countDocuments(), Interaction.countDocuments(), Application.countDocuments(), WidgetEvent.countDocuments()
  ]);
  res.json({ visits, interactions, applications, events });
});

router.get('/timeseries', auth, async (req, res) => {
  const coll = async (Model, field = 'ts') => Model.aggregate([
    { $group: { _id: { $dateToString: { date: `$${field}`, format: '%Y-%m-%d' } }, count: { $sum: 1 } } },
    { $sort: { _id: 1 } }
  ]);
  const [v, i, a, e] = await Promise.all([
    coll(Visit), coll(Interaction), coll(Application), coll(WidgetEvent)
  ]);
  const days = new Set([...v, ...i, ...a, ...e].map(x => x._id));
  const rows = Array.from(days).sort().map(day => ({
    day,
    visits: v.find(x => x._id === day)?.count || 0,
    interactions: i.find(x => x._id === day)?.count || 0,
    applications: a.find(x => x._id === day)?.count || 0,
    events: e.find(x => x._id === day)?.count || 0,
  }));
  res.json(rows);
});

module.exports = router;
