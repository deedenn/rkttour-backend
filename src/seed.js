const bcrypt = require('bcryptjs');
const { connectDB } = require('./db');
const Manager = require('./models/Manager');
const { ADMIN_EMAIL, ADMIN_PASSWORD } = require('./config');

(async () => {
  await connectDB();
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    console.error('Set ADMIN_EMAIL and ADMIN_PASSWORD in .env');
    process.exit(1);
  }
  const exists = await Manager.findOne({ email: ADMIN_EMAIL });
  if (exists) {
    console.log('Manager already exists:', ADMIN_EMAIL);
    process.exit(0);
  }
  const hash = await bcrypt.hash(ADMIN_PASSWORD, 10);
  await Manager.create({ email: ADMIN_EMAIL, passwordHash: hash });
  console.log('Manager created:', ADMIN_EMAIL);
  process.exit(0);
})();
