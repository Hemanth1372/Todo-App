const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const todosRoutes = require('./routes/todos');

const app = express();

// CORS configuration for deployment
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'http://localhost:5174',
  process.env.FRONTEND_URL // Add your Vercel frontend URL here
].filter(Boolean);

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(morgan('dev'));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/todos', todosRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', environment: process.env.NODE_ENV });
});

const pool = require("./db");
const fs = require("fs");
const path = require("path");

app.get("/api/init-db", async (req, res) => {
  try {
    const schemaPath = path.join(__dirname, "schema.sql");
    const schema = fs.readFileSync(schemaPath, "utf8");

    await pool.query(schema);

    res.json({
      success: true,
      message: "Database schema created successfully",
    });
  } catch (err) {
    console.error("Schema init error:", err);
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} (${process.env.NODE_ENV || 'development'} mode)`);
});
