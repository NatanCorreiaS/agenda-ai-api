import mongoose from "mongoose";

// Definir o esquema do médico
const physicianSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  specialization: { type: String, required: true },
  clinic: { type: String, required: true }, // Adicionado campo obrigatório
  availableDays: {
    type: [String],
    required: true,
    enum: [
      "domingo",
      "segunda",
      "terça",
      "quarta",
      "quinta",
      "sexta",
      "sábado",
    ], // Dias da semana em que o médico atende
  },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
});

export const PhysicianModel = mongoose.model("Physician", physicianSchema);