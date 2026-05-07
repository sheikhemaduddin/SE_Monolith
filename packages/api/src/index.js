const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/health', (req, res) => res.json({ status: 'ok', service: 'api', uptime: process.uptime() }));

app.get('/api/info', (req, res) => res.json({
  name: 'Cloudways Monorepo API',
  package: 'packages/api',
  nodeVersion: process.version,
  env: process.env.NODE_ENV || 'development',
  apiSecret: process.env.API_SECRET ? 'set ✓' : 'not set',
}));

app.get('/api/products', (req, res) => res.json({
  data: Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    price: parseFloat((Math.random() * 100 + 10).toFixed(2)),
  }))
}));

app.listen(PORT, () => console.log(`API running → http://localhost:${PORT}`));
