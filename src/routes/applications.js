const router = require('express').Router();
const auth = require('../middleware/auth');
const Application = require('../models/Application');

router.post('/', async (req, res) => {
  const body = req.body || {};
  if (!body.name || !(body.email || body.phone)) return res.status(400).json({ error: 'missing_contacts' });
  const item = await Application.create(body);
  res.json(item);
});

router.get('/', auth, async (req, res) => {
  const items = await Application.find({}).sort({ ts: -1 }).limit(500);
  res.json(items);
});

router.patch('/:id/status', auth, async (req, res) => {
  const { status } = req.body || {};
  const allowed = ['запрос клиента','отправлено предложение','бронирование тура','оплачено','тур выполнен'];
  if (!allowed.includes(status)) return res.status(400).json({ error: 'bad_status' });
  const item = await Application.findByIdAndUpdate(req.params.id, { status }, { new: true });
  res.json(item);
});

module.exports = router;
