import express from 'express';
import cors from 'cors';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;
const app = express();

// 1. IZINKAN FRONTEND MENGAKSES (CORS)
app.use(cors({
  origin: "*", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// 2. KONEKSI DATABASE (SUPABASE SSL)
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false, // Wajib untuk Supabase di Vercel
  },
});

// 3. ROUTES
app.get("/", (req, res) => res.send("Backend Laundry Aman & Siap!"));

// Get Outlets
app.get("/api/outlets", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM laundry_outlets");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Detail Outlet
app.get("/api/outlets/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM laundry_outlets WHERE id = $1", [id]);
    if (result.rows.length === 0) return res.status(404).json({ msg: "Not Found" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create Order
app.post("/api/orders", async (req, res) => {
  try {
    const { user_name, outlet_id, status, weight, price } = req.body;
    const result = await pool.query(
      "INSERT INTO orders (user_name, outlet_id, pickup_date, status, weight, price) VALUES ($1, $2, NOW(), $3, $4, $5) RETURNING *",
      [user_name || 'User', outlet_id, status || 'Menunggu Pickup', weight, price]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Get Orders
app.get("/api/orders", async (req, res) => {
  try {
    const query = `
      SELECT o.*, l.name as outlet_name 
      FROM orders o 
      LEFT JOIN laundry_outlets l ON o.outlet_id = l.id 
      ORDER BY o.pickup_date DESC
    `;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Order Detail
app.get("/api/orders/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const query = `
      SELECT o.*, l.name as outlet_name, l.address as outlet_address
      FROM orders o 
      LEFT JOIN laundry_outlets l ON o.outlet_id = l.id 
      WHERE o.id = $1
    `;
    const result = await pool.query(query, [id]);
    if (result.rows.length === 0) return res.status(404).json({ msg: "Not Found" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;