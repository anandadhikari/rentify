import express from "express";
import {
  createEstate,
  deleteEstate,
  getEstate,
  getEstates,
} from "../controllers/estate.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.post("/", verifyToken, createEstate);
router.delete("/:id", verifyToken, deleteEstate);
router.get("/single/:id", getEstate);
router.get("/", getEstates);

export default router;
