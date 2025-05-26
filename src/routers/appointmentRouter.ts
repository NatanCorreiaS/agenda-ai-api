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
  router.post("/api/appointments", makeAppointment);
  router.post("/api/appointments/user", findAllAppointmentsByUserId);
  router.delete("/api/appointments/delete", deleteAllAppointments);
  router.get("/api/appointments", findAllAppointments);
  router.post("/api/appointments/date", findByDate);
  router.post("/api/appointments/id", findAppointmentById);
};
