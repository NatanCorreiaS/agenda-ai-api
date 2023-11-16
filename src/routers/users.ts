import express from "express";
import {
  deleteUser,
  findOne,
  findAll,
  updateUser,
  deleteAllUsers,
} from "../controllers/users";

// Routing for users controller
export default (router: express.Router) => {
  router.get("/api/users", findAll);
  router.get("/api/users/find/:id", findOne);
  router.delete("/api/delete/:id", deleteUser);
  router.delete("/api/delete", deleteAllUsers);
  router.patch("/api/update/:id", updateUser);
};
