require('dotenv').config();

const cfg = {
  PORT: process.env.PORT || 4000,
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  CORS_ORIGIN: process.env.CORS_ORIGIN || '*',
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
};

if (!cfg.MONGODB_URI) throw new Error('MONGODB_URI is required');
if (!cfg.JWT_SECRET) throw new Error('JWT_SECRET is required');

module.exports = cfg;
