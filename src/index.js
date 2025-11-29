const express = require("express");
const cors = require("cors"); // 
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});


app.use(cors({
  origin: "*", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());


app.get("/", (req, res) => {
  res.send("Backend API Laundry is Running!");
});




app.get("/api/outlets", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM laundry_outlets");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.get("/api/outlets/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM laundry_outlets WHERE id = $1", [id]);
    if (result.rows.length === 0) return res.status(404).json({ msg: "Outlet not found" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.post("/api/orders", async (req, res) => {
  try {
    const { user_name, outlet_id, status, weight, price } = req.body;
    
    const result = await pool.query(
      "INSERT INTO orders (user_name, outlet_id, pickup_date, status, weight, price) VALUES ($1, $2, NOW(), $3, $4, $5) RETURNING *",
      [user_name || 'User Tamu', outlet_id, status || 'Menunggu Pickup', weight, price]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.get("/api/orders", async (req, res) => {
  try {
    
    const query = `
      SELECT o.*, l.name as outlet_name 
      FROM orders o 
      JOIN laundry_outlets l ON o.outlet_id = l.id 
      ORDER BY o.pickup_date DESC
    `;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.get("/api/orders/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const query = `
      SELECT o.*, l.name as outlet_name, l.address as outlet_address
      FROM orders o 
      JOIN laundry_outlets l ON o.outlet_id = l.id 
      WHERE o.id = $1
    `;
    const result = await pool.query(query, [id]);
    if (result.rows.length === 0) return res.status(404).json({ msg: "Order not found" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;