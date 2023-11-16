import express from "express";
import {
  deleteAllAppointments,
  findAllAppointments,
  makeAppointment,
} from "../controllers/appointment";

// Routing for appointment controller
export default (router: express.Router) => {
  router.post("/api/appointment", makeAppointment);
  router.delete("/api/appointment/delete", deleteAllAppointments);
  router.get("/api/appointment", findAllAppointments);
};
