import express from "express";
import authRouter from "./authRouter";
import usersRouters from "./users";
import appointmentRouter from "./appointmentRouter";
import physician from "./physician";

const router = express.Router();

export default () => {
  authRouter(router);
  usersRouters(router);
  appointmentRouter(router);
  physician(router);

  return router;
};
