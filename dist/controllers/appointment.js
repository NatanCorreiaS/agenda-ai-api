"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllAppointments = exports.deleteAllAppointments = exports.makeAppointment = void 0;
const appointment_1 = require("../db/appointment");
const makeAppointment = async (req, res) => {
    try {
        const { userId, date, clinic } = req.body;
        console.log("userId: ", userId, " date: ", date, " clinic: ", clinic);
        const dateAlreadyPicked = await (0, appointment_1.findAppointmentByDate)(date).select("+clinic");
        if (dateAlreadyPicked) {
            if (dateAlreadyPicked.clinic === clinic) {
                return res.status(400).json({ message: "Data já agendada." });
            }
        }
        const appointment = await new appointment_1.AppointmentModel({ userId, date, clinic });
        await appointment.save();
        res.status(201).json(appointment);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erro interno do servidor." });
    }
};
exports.makeAppointment = makeAppointment;
const deleteAllAppointments = async (req, res) => {
    try {
        await appointment_1.AppointmentModel.deleteMany({});
        res.status(200).json({ message: "Todos os agendamentos foram deletados." });
    }
    catch (error) {
        console.error(error);
    }
};
exports.deleteAllAppointments = deleteAllAppointments;
const findAllAppointments = async (req, res) => {
    try {
        const appointments = await appointment_1.AppointmentModel.find({});
        res.status(200).json(appointments);
    }
    catch (error) {
        console.error(error);
        res.sendStatus(400);
    }
};
exports.findAllAppointments = findAllAppointments;
//# sourceMappingURL=appointment.js.map