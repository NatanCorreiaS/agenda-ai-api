"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAppointmentByDate = exports.findAppointmentByUserId = exports.findAppointmentById = exports.findAll = exports.createAppointment = exports.deleteAllAppointments = exports.AppointmentModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const appointmentSchema = new mongoose_1.default.Schema({
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" },
    date: {
        type: Date,
        required: true,
        min: new Date("2023-11-11T08:00:00.000Z"),
        max: new Date("2023-11-11T12:00:00.000Z"),
    },
    clinic: { type: String, required: true },
});
exports.AppointmentModel = mongoose_1.default.model("Appointment", appointmentSchema);
const deleteAllAppointments = () => exports.AppointmentModel.deleteMany({});
exports.deleteAllAppointments = deleteAllAppointments;
const createAppointment = (appointment) => new exports.AppointmentModel(appointment)
    .save()
    .then((appointmentObj) => appointmentObj.toObject());
exports.createAppointment = createAppointment;
const findAll = () => exports.AppointmentModel.find({});
exports.findAll = findAll;
const findAppointmentById = (id) => exports.AppointmentModel.findById(id);
exports.findAppointmentById = findAppointmentById;
const findAppointmentByUserId = (userId) => exports.AppointmentModel.find({ userId });
exports.findAppointmentByUserId = findAppointmentByUserId;
const findAppointmentByDate = (date) => exports.AppointmentModel.findOne({ date });
exports.findAppointmentByDate = findAppointmentByDate;
//# sourceMappingURL=appointment.js.map