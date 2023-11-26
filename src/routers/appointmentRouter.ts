import express from "express";
import {
  deleteAllAppointments,
  findAllAppointments,
  findAllAppointmentsByUserId,
  findAppointmentById,
  findByDate,
  makeAppointment,
} from "../controllers/appointment";

// Routing for appointment controller
export default (router: express.Router) => {
  router.post("/api/appointment", makeAppointment);
  router.post("/api/appointment/user", findAllAppointmentsByUserId);
  router.delete("/api/appointment/delete", deleteAllAppointments);
  router.get("/api/appointment", findAllAppointments);
  router.post("/api/appointment/date", findByDate);
  router.post("/api/appointment/id", findAppointmentById);
};
