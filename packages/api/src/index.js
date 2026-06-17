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
