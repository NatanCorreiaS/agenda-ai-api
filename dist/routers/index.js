"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRouter_1 = __importDefault(require("./authRouter"));
const users_1 = __importDefault(require("./users"));
const appointmentRouter_1 = __importDefault(require("./appointmentRouter"));
const router = express_1.default.Router();
exports.default = () => {
    (0, authRouter_1.default)(router);
    (0, users_1.default)(router);
    (0, appointmentRouter_1.default)(router);
    return router;
};
//# sourceMappingURL=index.js.map