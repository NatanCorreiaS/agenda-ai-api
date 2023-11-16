"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("../controllers/auth");
exports.default = (router) => {
    router.post("/api/register", auth_1.register);
    router.post("/api/login", auth_1.login);
    router.post("/api/session", auth_1.findBySession);
};
//# sourceMappingURL=authRouter.js.map