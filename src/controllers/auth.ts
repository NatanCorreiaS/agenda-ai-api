import express from "express";
import {
  createUser,
  findUserByEmail,
  findUserBySessionToken,
} from "../db/users";
import { random, authentication } from "../helpers/crypto";

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "The request must have username, email, cpf and password",
      });
    }

    //   Checking if there is already a user with this email
    if (await findUserByEmail(email)) {
      return res.status(409).json({
        message: "There is already a user with this email",
      });
    }

    //   Creating random salt
    const salt = random();

    const user = await createUser({
      username,
      email,
      authentication: {
        password: authentication(salt, password),
        salt,
      },
    });

    return res.status(200).json({ message: "User created successfully", user });
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
};

export const login = async (req: express.Request, res: express.Response) => {
  try {
    console.log("An user has requested to login");
    const { email, password } = req.body;

    //  Checking if the request has cpf and password
    if (!email || !password) {
      return res.status(400).json({
        message: "The request must have cpf and password",
      });
    }

    // Selecting the user by cpf with the password and salt
    const user = await findUserByEmail(email).select(
      "+authentication.salt +authentication.password"
    );

    // Checking if there is a user with this cpf
    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    // Creating the expected hash code
    const expectedHashCode = authentication(user.authentication.salt, password);

    // Checking if the password is correct
    if (user.authentication.password !== expectedHashCode) {
      return res.status(400).json({
        message: "Incorrect password",
      });
    }

    const salt = random();

    user.authentication.sessionToken = authentication(
      salt,
      user._id.toString()
    );

    await user.save();

    res.cookie("AGENDA-AI-TOKEN", user.authentication.sessionToken, {
      domain: "localhost",
      path: "/", // The cookie will be sent to all routes
    });

    // Creating the session token
    return res.status(200).json({
      message: "User logged successfully",
      session: user.authentication.sessionToken,
      username: user.username,
      email: user.email,
    });
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
};

export const findBySession = async (
  req: express.Request,
  res: express.Response
) => {
  const { sessionToken } = req.body;
  if (!sessionToken) {
    return res.status(400).json({ message: "Invalid session" });
  }
  const user = await findUserBySessionToken(sessionToken);
  if (!user) {
    return res.status(400).json({ message: "No user with that session" });
  }
  return res.json(user);
};
