import express from "express";
import authRouter from "./authRouter";
import usersRouters from "./users";
import appointmentRouter from "./appointmentRouter";

const router = express.Router();

export default () => {
  authRouter(router);
  usersRouters(router);
  appointmentRouter(router);

  return router;
};
