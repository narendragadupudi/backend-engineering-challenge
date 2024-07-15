const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
app.use(bodyParser.json());

const pool = new Pool({
  user: 'postgres',
  host: 'postgres',
  database: 'order-db',
  password: 'password',
  port: 5432
});

app.get('/orders', async (req, res) => {
  const result = await pool.query('SELECT * FROM orders');
  res.send(result.rows);
});

app.post('/orders', async (req, res) => {
  const { userId, productIds, total } = req.body;
  const result = await pool.query('INSERT INTO orders (user_id, product_ids, total) VALUES ($1, $2, $3) RETURNING *', [userId, productIds, total]);
  res.status(201).send(result.rows[0]);
});

app.put('/orders/:id', async (req, res) => {
  const { id } = req.params;
  const { userId, productIds, total } = req.body;
  const result = await pool.query('UPDATE orders SET user_id = $1, product_ids = $2, total = $3 WHERE id = $4 RETURNING *', [userId, productIds, total, id]);
  res.send(result.rows[0]);
});

app.delete('/orders/:id', async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM orders WHERE id = $1', [id]);
  res.send('Order deleted');
});

app.listen(3002, () => {
  console.log('Order Processing Service running on port 3002');
});
