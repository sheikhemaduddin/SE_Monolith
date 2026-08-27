const express = require('express');
const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/health', (req, res) => res.json({
  status: 'ok',
  service: 'api',
  version: '1.0.3',
  uptime: process.uptime(),
}));

app.get('/', (req, res) => res.json({
  service: 'Cloudways Monorepo API',
  version: '1.0.3',
  endpoints: ['/health', '/api/info', '/api/products', '/api/orders', '/api/stats', '/api/customers', '/api/ping'],
}));

app.get('/api/info', (req, res) => res.json({
  name: 'Cloudways Monorepo API',
  package: 'packages/api',
  version: '1.0.3',
  nodeVersion: process.version,
  env: process.env.NODE_ENV || 'development',
  apiSecret: process.env.API_SECRET ? 'set ✓' : 'not set',
}));

app.get('/api/ping', (req, res) => res.json({
  pong: true,
  timestamp: new Date().toISOString(),
}));

app.get('/api/products', (req, res) => res.json({
  data: Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    price: parseFloat((Math.random() * 100 + 10).toFixed(2)),
  }))
}));

const ORDER_STATUSES = ['pending', 'processing', 'shipped', 'delivered'];
const CUSTOMERS = ['Alex Kim', 'Jordan Lee', 'Sam Rivera', 'Casey Morgan', 'Riley Chen'];

app.get('/api/orders', (req, res) => {
  const data = Array.from({ length: 8 }, (_, i) => {
    const total = parseFloat((Math.random() * 250 + 25).toFixed(2));
    return {
      id: `ORD-${1000 + i}`,
      customer: CUSTOMERS[i % CUSTOMERS.length],
      items: Math.floor(Math.random() * 5) + 1,
      total,
      status: ORDER_STATUSES[i % ORDER_STATUSES.length],
      createdAt: new Date(Date.now() - i * 3600_000 * 6).toISOString(),
    };
  });
  res.json({ data, count: data.length });
});

app.get('/api/stats', (req, res) => res.json({
  products: 10,
  orders: 8,
  customers: 5,
  uptime: Math.floor(process.uptime()),
  env: process.env.NODE_ENV || 'development',
}));

app.get('/api/customers', (req, res) => {
  const data = CUSTOMERS.map((name, i) => ({
    id: i + 1,
    name,
    email: `${name.toLowerCase().replace(/\s+/g, '.')}@example.com`,
    orders: Math.floor(Math.random() * 6) + 1,
  }));
  res.json({ data, count: data.length });
});

module.exports = app;

if (require.main === module) {
  const server = app.listen(PORT, () =>
    console.log(`API running → http://localhost:${PORT}`)
  );
  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(
        `Port ${PORT} is already in use (another API instance may be running). Stop it or set PORT to a free port.`
      );
      process.exit(1);
    }
    throw err;
  });
}
