import { OutletModel } from "../models/outletModel.js";

export const OutletController = {
  async create(req, res) {
    try {
      const outlet = await OutletModel.create(req.body);
      res.status(201).json(outlet);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async getAll(req, res) {
    try {
      const outlets = await OutletModel.getAll();
      res.json(outlets);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getById(req, res) {
    try {
      const outlet = await OutletModel.getById(req.params.id);
      res.json(outlet);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      const outlet = await OutletModel.update(req.params.id, req.body);
      res.json(outlet);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async remove(req, res) {
    try {
      const result = await OutletModel.remove(req.params.id);
      res.json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
};
