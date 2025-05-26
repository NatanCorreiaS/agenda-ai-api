import express from "express";
import {
  registerPhysician,
  loginPhysician,
  findPhysicianBySession,
} from "../controllers/auth";
import { findBySession, login, register } from "../controllers/auth";

// Routing for auth controller
export default (router: express.Router) => {

  // Rotas de autenticação para physician
  router.post("/api/physicians/register", registerPhysician);
  router.post("/api/physicians/login", loginPhysician);
  router.post("/api/physicians/session", findPhysicianBySession);

  router.post("/api/users/register", register);
  router.post("/api/users/login", login);
  router.post("/api/users/session", findBySession);
};
