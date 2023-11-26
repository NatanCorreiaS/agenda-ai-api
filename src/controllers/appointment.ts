import express from "express";
import {
  AppointmentModel,
  findAppointmentByDate,
  findAppointmentByUserId,
} from "../db/appointment";

export const makeAppointment = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { userId, date, clinic, consultationType } = req.body;
    console.log(
      "userId: ",
      userId,
      " date: ",
      date,
      " clinic: ",
      clinic,
      " consultationType: ",
      consultationType
    );

    const dateAlreadyPicked = await findAppointmentByDate(date).select(
      "+clinic"
    );

    if (dateAlreadyPicked) {
      if (dateAlreadyPicked.clinic === clinic) {
        if (dateAlreadyPicked.consultationType === consultationType) {
          return res.status(400).json({ message: "Data já agendada." });
        }
      }
    }

    // Criar o agendamento
    const appointment = await new AppointmentModel({
      userId,
      date,
      clinic,
      consultationType,
    });

    // Salvar o agendamento no banco de dados
    await appointment.save();

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
