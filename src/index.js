import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Import Routes
import orderRoutes from './routes/orderRoutes.js';
import outletRoutes from './routes/outletRoutes.js';

dotenv.config();

const app = express();

// 1. MIDDLEWARE
app.use(cors({
  origin: "*", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// 2. DEFAULT ROUTE (Health Check)
app.get("/", (req, res) => {
  res.send("Backend Laundry Aman & Siap (MVC Structure)!");
});

// 3. API ROUTES
// Semua request ke /api/outlets akan ditangani outletRoutes
app.use('/api/outlets', outletRoutes);

// Semua request ke /api/orders akan ditangani orderRoutes
app.use('/api/orders', orderRoutes);

// 4. SERVER LISTENER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;