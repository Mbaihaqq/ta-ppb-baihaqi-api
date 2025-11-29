import { OrderModel } from "../models/orderModel.js";

export const OrderController = {
  async create(req, res) {
    try {
      // Default values jika tidak dikirim dari frontend
      const newOrder = {
        ...req.body,
        status: req.body.status || 'Menunggu Pickup',
        pickup_date: new Date() // Set waktu sekarang
      };
      
      const order = await OrderModel.create(newOrder);
      res.status(201).json(order);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async getAll(req, res) {
    try {
      const orders = await OrderModel.getAll();
      res.json(orders);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getById(req, res) {
    try {
      const order = await OrderModel.getById(req.params.id);
      if (!order) return res.status(404).json({ error: "Order not found" });
      res.json(order);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      const order = await OrderModel.update(req.params.id, req.body);
      res.json(order);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async remove(req, res) {
    try {
      const result = await OrderModel.remove(req.params.id);
      res.json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
};