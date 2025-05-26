import express from "express";
import {
  createUser,
  findUserByEmail,
  findUserBySessionToken,
} from "../db/users";
import { random, authentication } from "../helpers/crypto";
import { PhysicianModel } from "../db/physician";

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "The request must have username, email, cpf and password",
      });
    }

    if (await findUserByEmail(email)) {
      return res.status(409).json({
        message: "There is already a user with this email",
      });
    }

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

    if (!email || !password) {
      return res.status(400).json({
        message: "The request must have cpf and password",
      });
    }

    const user = await findUserByEmail(email).select(
      "+authentication.salt +authentication.password"
    );

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const expectedHashCode = authentication(user.authentication.salt, password);

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
      path: "/",
    });

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

// Registrar médico
export const registerPhysician = async (req: express.Request, res: express.Response) => {
  try {
    const { name, email, password, specialization, availableDays, clinic } = req.body;

    if (!name || !email || !password || !specialization || !availableDays || !clinic) {
      return res.status(400).json({
        message: "Os campos name, email, password, specialization, availableDays e clinic são obrigatórios.",
      });
    }

    const existing = await PhysicianModel.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "Já existe um médico com este email." });
    }

    const salt = random();

    const physician = await PhysicianModel.create({
      name,
      email,
      specialization,
      availableDays,
      clinic,
      authentication: {
        password: authentication(salt, password),
        salt,
      },
    });

    return res.status(201).json({ message: "Médico criado com sucesso", physician });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erro ao criar médico." });
  }
};

// Login médico
export const loginPhysician = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Os campos email e password são obrigatórios.",
      });
    }

    const physician = await PhysicianModel.findOne({ email }).select(
      "+authentication.salt +authentication.password"
    );

    if (!physician) {
      return res.status(400).json({ message: "Médico não encontrado." });
    }

    const expectedHash = authentication(physician.authentication.salt, password);

    if (physician.authentication.password !== expectedHash) {
      return res.status(400).json({ message: "Senha incorreta." });
    }

    const salt = random();

    physician.authentication.sessionToken = authentication(
      salt,
      physician._id.toString()
    );

    await physician.save();

    res.cookie("AGENDA-AI-PHYSICIAN-TOKEN", physician.authentication.sessionToken, {
      domain: "localhost",
      path: "/",
    });

    return res.status(200).json({
      message: "Médico autenticado com sucesso",
      session: physician.authentication.sessionToken,
      name: physician.name,
      email: physician.email,
      specialization: physician.specialization,
      availableDays: physician.availableDays,
      clinic: physician.clinic,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erro ao autenticar médico." });
  }
};

export const findPhysicianBySession = async (
  req: express.Request,
  res: express.Response
) => {
  const { sessionToken } = req.body;
  if (!sessionToken) {
    return res.status(400).json({ message: "Sessão inválida." });
  }
  const physician = await PhysicianModel.findOne({
    "authentication.sessionToken": sessionToken,
  });
  if (!physician) {
    return res.status(400).json({ message: "Nenhum médico com essa sessão." });
  }
  return res.json(physician);
};

