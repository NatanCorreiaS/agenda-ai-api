import mongoose from "mongoose";
import { PhysicianModel } from "./physician";

// Definir o esquema do agendamento
const appointmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  physicianId: { type: mongoose.Schema.Types.ObjectId, ref: "Physician", required: true },
  date: {
    type: Date,
    required: true,
    validate: {
      validator: function (value: Date) {
        return value >= new Date();
      },
      message: "A data do agendamento deve ser igual ou posterior à data atual.",
    },
  },
  consultationType: { type: String, required: false }, // Agora preenchido automaticamente
  clinic: { type: String, required: false }, // Preenchido automaticamente
});

// Middleware para preencher clinic e consultationType automaticamente
appointmentSchema.pre("save", async function (next) {
  if ((!(this as any).clinic || !(this as any).consultationType) && this.physicianId) {
    const physician = await PhysicianModel.findById(this.physicianId);
    if (physician) {
      if (!(this as any).clinic) {
        (this as any).clinic = physician.clinic;
      }
      if (!(this as any).consultationType) {
        (this as any).consultationType = physician.specialization;
      }
    }
  }
  next();
});

export const AppointmentModel = mongoose.model(
  "Appointment",
  appointmentSchema
);

// Handlers

export const deleteAllAppointments = () => AppointmentModel.deleteMany({});

export const createAppointment = (appointment: Record<string, any>) =>
  new AppointmentModel(appointment)
    .save()
    .then((appointmentObj) => appointmentObj.toObject());

export const findAll = () => AppointmentModel.find({});
export const findAppointmentById = (id: string) =>
  AppointmentModel.findById(id);
export const findAppointmentByUserId = (userId: string) =>
  AppointmentModel.find({ userId });
export const findAppointmentByDate = (date: string) =>
  AppointmentModel.findOne({ date });
