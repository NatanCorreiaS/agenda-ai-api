"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appointment_1 = require("../controllers/appointment");
exports.default = (router) => {
    router.post("/api/appointment", appointment_1.makeAppointment);
    router.delete("/api/appointment/delete", appointment_1.deleteAllAppointments);
    router.get("/api/appointment", appointment_1.findAllAppointments);
};
//# sourceMappingURL=appointmentRouter.js.map