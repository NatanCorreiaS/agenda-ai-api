import express from "express";
import {
  AppointmentModel,
  findAppointmentByDate,
  findAppointmentByUserId,
  createAppointment,
} from "../db/appointment";

export const makeAppointment = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { userId, physicianId, date } = req.body;

    if (!userId || !physicianId || !date) {
      return res.status(400).json({ message: "Campos obrigatórios ausentes." });
    }

    // Verifica se já existe agendamento para o mesmo médico e data
    const dateAlreadyPicked = await findAppointmentByDate(date);

    if (dateAlreadyPicked) {
      if (
        String(dateAlreadyPicked.physicianId) === String(physicianId)
      ) {
        return res.status(400).json({ message: "Data já agendada para este médico." });
      }
    }

    // Criar o agendamento (clinic e consultationType serão preenchidos automaticamente)
    const appointment = await createAppointment({
      userId,
      physicianId,
      date,
    });

    res.status(201).json(appointment);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
};

export const deleteAllAppointments = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    await AppointmentModel.deleteMany({});
    res.status(200).json({ message: "Todos os agendamentos foram deletados." });
  } catch (error) {
    console.error(error);
  }
};

export const findAllAppointments = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const appointments = await AppointmentModel.find({});
    res.status(200).json(appointments);
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
};

export const findAllAppointmentsByUserId = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { userId } = req.body;
    const appointments = await findAppointmentByUserId(userId);
    res.status(200).json(appointments);
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
};

export const findAppointmentById = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.body;
    const appointment = await AppointmentModel.findById(id);
    res.status(200).json(appointment);
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
};

export const findByDate = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { date } = req.body;
    const appointment = await findAppointmentByDate(date);
    res.status(200).json(appointment);
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
};



// JSON FORMAT TO BE SENT IN THE BODY OF THE REQUEST
// {
//   "userId": "ID_DO_USUÁRIO",
//   "physicianId": "ID_DO_MÉDICO",
//   "date": "2023-10-01T10:00:00Z", // Data do agendamento
// }

