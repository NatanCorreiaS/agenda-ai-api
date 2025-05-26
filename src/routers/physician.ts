import express from "express";
import {
  findAllPhysicians,
  findPhysicianById,
  deletePhysicianById,
} from "../controllers/physician";

export default (router: express.Router) => {
// CRUD de médicos
// router.post("/api/physicians/", createPhysician);
router.get("/api/physicians/", findAllPhysicians);
router.get("/api/physicians/:id", findPhysicianById);
router.delete("/api/physicians/:id", deletePhysicianById);
}