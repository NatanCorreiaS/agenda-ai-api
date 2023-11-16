"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../controllers/users");
exports.default = (router) => {
    router.get("/api/users", users_1.findAll);
    router.get("/api/users/find/:id", users_1.findOne);
    router.delete("/api/delete/:id", users_1.deleteUser);
    router.delete("/api/delete", users_1.deleteAllUsers);
    router.patch("/api/update/:id", users_1.updateUser);
};
//# sourceMappingURL=users.js.map