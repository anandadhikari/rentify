import express from "express";
import {
  createEstate,
  deleteEstate,
  getEstate,
  getEstates,
  patchEstate
} from "../controllers/estate.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.post("/", verifyToken, createEstate);
router.delete("/:id", verifyToken, deleteEstate);
router.patch("/:id", verifyToken, patchEstate);
router.get("/single/:id", getEstate);
router.get("/", getEstates);

export default router;
