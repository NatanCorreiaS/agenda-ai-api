import mongoose from "mongoose";

// Definir o esquema do agendamento
const appointmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  date: {
    type: Date,
    required: true,
    min: new Date("2023-11-11T08:00:00.000Z"),
    max: new Date("2023-11-11T12:00:00.000Z"),
  },
  clinic: { type: String, required: true },
});

export const AppointmentModel = mongoose.model(
  "Appointment",
  appointmentSchema
);
// Handlers

// Delete
export const deleteAllAppointments = () => AppointmentModel.deleteMany({});

// Create
export const createAppointment = (appointment: Record<string, any>) =>
  new AppointmentModel(appointment)
    .save()
    .then((appointmentObj) => appointmentObj.toObject());

// Find All
export const findAll = () => AppointmentModel.find({});
// Find by id
export const findAppointmentById = (id: string) =>
  AppointmentModel.findById(id);
// Find by userId
export const findAppointmentByUserId = (userId: string) =>
  AppointmentModel.find({ userId });
// Find by date
export const findAppointmentByDate = (date: string) =>
  AppointmentModel.findOne({ date });
