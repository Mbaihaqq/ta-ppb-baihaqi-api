import express from "express";
import "dotenv/config";

import outletRoutes from "./routes/outletRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";


const app = express();
app.use(express.json());

// ROUTES
app.use("/api/outlets", outletRoutes);
app.use("/api/orders", orderRoutes);

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Backend Laundry App Berjalan Normal!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
