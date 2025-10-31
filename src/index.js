const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const { connectDB } = require('./db');
const cfg = require('./config');

const app = express();
app.use(helmet());
app.use(cors({ origin: cfg.CORS_ORIGIN, credentials: true }));
app.use(express.json({ limit: '1mb' }));
app.use(compression());
app.use(morgan('tiny'));
app.use(rateLimit({ windowMs: 60_000, max: 240 }));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/visits', require('./routes/visits'));
app.use('/api/interactions', require('./routes/interactions'));
app.use('/api/applications', require('./routes/applications'));
app.use('/api/widget-events', require('./routes/widgetEvents'));
app.use('/api/metrics', require('./routes/metrics'));

app.get('/api/health', (req, res) => res.json({ ok: true }));

connectDB().then(() => {
  app.listen(cfg.PORT, () => console.log(`API on http://localhost:${cfg.PORT}`));
});
