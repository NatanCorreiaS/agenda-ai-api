"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAllUsers = exports.updateUser = exports.findOne = exports.findAll = exports.deleteUser = void 0;
const users_1 = require("../db/users");
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { password, email } = req.body;
        console.log("password", password, " email: ", email);
        if (id) {
            const user = await (0, users_1.findUserById)(id);
            if (!user)
                return res.status(400).json({ message: "User not found" });
            const deletedUser = await (0, users_1.deleteById)(id);
            return res.json({ message: "user deleted", deletedUser });
        }
        else if (email) {
            const user = await (0, users_1.findUserByEmail)(email);
            if (!user)
                return res.status(400).json({ message: "User not found" });
            const deletedUser = await (0, users_1.deleteUserByEmail)(email);
            return res.json({ message: "user deleted", deletedUser });
        }
        else {
            return res.status(400).json({ message: "Invalid params" });
        }
    }
    catch (err) {
        console.log(err);
        return res.sendStatus(400);
    }
};
exports.deleteUser = deleteUser;
const findAll = async (req, res) => {
    try {
        const users = await (0, users_1.findAllUsers)();
        return res.json(users);
    }
    catch (err) {
        console.log(err);
        return res.sendStatus(400);
    }
};
exports.findAll = findAll;
const findOne = async (req, res) => {
    try {
        const { id } = req.params;
        if (id) {
            const user = await (0, users_1.findUserById)(id);
            return res.json(user);
        }
        else {
            return res.status(400).json({ message: "Invalid id" });
        }
    }
    catch (err) {
        console.log(err);
        return res.sendStatus(400);
    }
};
exports.findOne = findOne;
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, password, email } = req.body;
        if (id) {
            const user = await (0, users_1.findUserById)(id).select("+authentication.password");
            if (!user)
                return res.status(400).json({ message: "User not found" });
            user.username = name;
            user.authentication.password = password;
            user.email = email;
            await user.save();
            return res.status(200).json(user).end();
        }
        else {
            return res.status(400).json({ message: "Invalid id" });
        }
    }
    catch (err) {
        console.log(err);
        return res.sendStatus(400);
    }
};
exports.updateUser = updateUser;
const deleteAllUsers = async (req, res) => {
    try {
        await (0, users_1.deleteMany)();
        res.status(200).json({ message: "All users deleted" });
    }
    catch (err) {
        console.log(err);
        return res.sendStatus(400);
    }
};
exports.deleteAllUsers = deleteAllUsers;
//# sourceMappingURL=users.js.map