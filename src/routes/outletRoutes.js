import express from "express";
import { OutletController } from "../controllers/outletController.js";

const router = express.Router();

router.post("/", OutletController.create);
router.get("/", OutletController.getAll);
router.get("/:id", OutletController.getById);
router.put("/:id", OutletController.update);
router.delete("/:id", OutletController.remove);

export default router;
