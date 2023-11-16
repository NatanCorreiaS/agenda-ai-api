import express from "express";
import { findBySession, login, register } from "../controllers/auth";

// Routing for auth controller
export default (router: express.Router) => {
  router.post("/api/register", register);
  router.post("/api/login", login);
  router.post("/api/session", findBySession);
};
