const express = require('express');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 5000;

// Minimalist CORS middleware to allow Vercel to access this API
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  next();
});

// Connect to Supabase using the connection string environment variable
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false } // Required for Supabase cloud connections
});

// Your GET endpoint
app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, email, full_name FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database query failed' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
