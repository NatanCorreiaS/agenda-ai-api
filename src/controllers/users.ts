import express from "express";

import {
  deleteById,
  deleteUserByEmail,
  findAllUsers,
  findUserById,
  findUserByEmail,
  deleteMany,
} from "../db/users";

// Deleting user
export const deleteUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    // Id is a param
    const { id } = req.params;
    const { password, email } = req.body;
    console.log("password", password, " email: ", email);

    if (id) {
      const user = await findUserById(id);
      if (!user) return res.status(400).json({ message: "User not found" });
      const deletedUser = await deleteById(id);

      return res.json({ message: "user deleted", deletedUser });
    } else if (email) {
      const user = await findUserByEmail(email);
      if (!user) return res.status(400).json({ message: "User not found" });
      const deletedUser = await deleteUserByEmail(email);

      return res.json({ message: "user deleted", deletedUser });
    } else {
      return res.status(400).json({ message: "Invalid params" });
    }
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
};

// Finding all users
export const findAll = async (req: express.Request, res: express.Response) => {
  try {
    const users = await findAllUsers();
    return res.json(users);
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
};

export const findOne = async (req: express.Request, res: express.Response) => {
  try {
    //  Checking if the request has id, cpf or email
    // Id is a param
    const { id } = req.params;

    if (id) {
      const user = await findUserById(id);
      return res.json(user);
    } else {
      return res.status(400).json({ message: "Invalid id" });
    }
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
};

export const updateUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const { name, password, email } = req.body;

    if (id) {
      const user = await findUserById(id).select("+authentication.password");
      if (!user) return res.status(400).json({ message: "User not found" });
      user.username = name;
      user.authentication.password = password;
      user.email = email;

      await user.save();
      return res.status(200).json(user).end();
    } else {
      return res.status(400).json({ message: "Invalid id" });
    }
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
};

export const deleteAllUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    await deleteMany();
    res.status(200).json({ message: "All users deleted" });
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
};

export const getId = async (req: express.Request, res: express.Response) => {
  try {
    const { email } = req.body;
    const user = await findUserByEmail(email);
    if (!user) return res.status(400).json({ message: "User not found" });
    return res.status(200).json({ id: user._id });
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
};

// JSON FORMAT TO BE SENT IN THE BODY OF THE REQUEST
// {
//   "name": "Nome do Usuário",
//   "email": "
//   "password": "Senha do Usuário"
// }
