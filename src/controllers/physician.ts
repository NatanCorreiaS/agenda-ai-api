import express from "express";
import { PhysicianModel } from "../db/physician";
import { random, authentication } from "../helpers/crypto";

// Registro de médico
export const registerPhysician = async (
  req: express.Request,
  res: express.Response
) => {
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

// Login de médico
export const loginPhysician = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Os campos email e password são obrigatórios." });
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
    physician.authentication.sessionToken = authentication(salt, physician._id.toString());
    await physician.save();

    res.cookie("AGENDA-AI-PHYSICIAN-TOKEN", physician.authentication.sessionToken, {
      domain: "localhost",
      path: "/",
    });

    return res.status(200).json({
      message: "Login realizado com sucesso",
      session: physician.authentication.sessionToken,
      name: physician.name,
      email: physician.email,
      specialization: physician.specialization,
      clinic: physician.clinic,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erro ao realizar login." });
  }
};

// Criar médico
export const createPhysician = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { name, email, password, specialization, availableDays, clinic } = req.body;

    if (!name || !email || !password || !specialization || !availableDays || !clinic) {
      return res.status(400).json({
        message: "Os campos name, email, password, specialization, availableDays e clinic são obrigatórios.",
      });
    }

    // Verifica se já existe médico com o mesmo email
    const existing = await PhysicianModel.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "Já existe um médico com este email." });
    }

    // Criação do médico
    const physician = await PhysicianModel.create({
      name,
      email,
      specialization,
      availableDays,
      clinic,
      authentication: {
        password, // Idealmente, faça hash da senha antes de salvar
      },
    });

    return res.status(201).json(physician);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erro ao criar médico." });
  }
};

// Buscar todos os médicos
export const findAllPhysicians = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const physicians = await PhysicianModel.find({});
    return res.status(200).json(physicians);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erro ao buscar médicos." });
  }
};

// Buscar médico por ID
export const findPhysicianById = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const physician = await PhysicianModel.findById(id);
    if (!physician) {
      return res.status(404).json({ message: "Médico não encontrado." });
    }
    return res.status(200).json(physician);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erro ao buscar médico." });
  }
};

// Deletar médico por ID
export const deletePhysicianById = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const deleted = await PhysicianModel.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Médico não encontrado." });
    }
    return res.status(200).json({ message: "Médico deletado com sucesso." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erro ao deletar médico." });
  }
};

// JSON FORMAT TO BE SENT IN THE BODY OF THE REQUEST
// {
//   "name": "Nome do Médico",
//   "email": "email@exemplo.com",
//   "password": "Senha do Médico",
//   "specialization": "Especialização do Médico",
//   "availableDays": ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"],
//   "clinic": "Nome da Clínica"
// }