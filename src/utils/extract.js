function pick(obj, ...keys) {
  for (const k of keys) if (obj && typeof obj === 'object' && obj[k]) return obj[k];
  return null;
}

function deepText(o) {
  if (!o) return null;
  if (typeof o === 'string') return o;
  if (typeof o === 'object') {
    const cand = pick(o, 'message', 'text', 'query', 'question', 'prompt');
    if (cand) return cand;
    for (const v of Object.values(o)) {
      const r = deepText(v);
      if (r) return r;
    }
  }
  return null;
}

function findLead(o) {
  if (!o || typeof o !== 'object') return null;
  const payload = o.lead || o.payload?.lead || o.payload || o.data || o;
  const name = pick(payload, 'name', 'fullName', 'fio');
  const email = pick(payload, 'email', 'mail');
  const phone = pick(payload, 'phone', 'tel', 'phoneNumber');
  const budget = pick(payload, 'budget', 'price', 'sum');
  const dates = pick(payload, 'dates', 'when', 'dateRange');
  const destination = pick(payload, 'destination', 'country', 'place', 'city');
  const message = pick(payload, 'message', 'comment', 'note');
  if (name && (email || phone)) {
    return { name, email: email || '', phone: phone || '', budget: budget || '', dates: dates || '', destination: destination || '', message: message || '' };
  }
  return null;
}

module.exports = { deepText, findLead };
