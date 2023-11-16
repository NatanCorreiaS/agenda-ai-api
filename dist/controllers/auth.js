"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findBySession = exports.login = exports.register = void 0;
const users_1 = require("../db/users");
const crypto_1 = require("../helpers/crypto");
const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({
                message: "The request must have username, email, cpf and password",
            });
        }
        if (await (0, users_1.findUserByEmail)(email)) {
            return res.status(409).json({
                message: "There is already a user with this email",
            });
        }
        const salt = (0, crypto_1.random)();
        const user = await (0, users_1.createUser)({
            username,
            email,
            authentication: {
                password: (0, crypto_1.authentication)(salt, password),
                salt,
            },
        });
        return res.status(200).json({ message: "User created successfully", user });
    }
    catch (err) {
        console.log(err);
        return res.sendStatus(400);
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        console.log("An user has requested to login");
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "The request must have cpf and password",
            });
        }
        const user = await (0, users_1.findUserByEmail)(email).select("+authentication.salt +authentication.password");
        if (!user) {
            return res.status(400).json({
                message: "User not found",
            });
        }
        const expectedHashCode = (0, crypto_1.authentication)(user.authentication.salt, password);
        if (user.authentication.password !== expectedHashCode) {
            return res.status(400).json({
                message: "Incorrect password",
            });
        }
        const salt = (0, crypto_1.random)();
        user.authentication.sessionToken = (0, crypto_1.authentication)(salt, user._id.toString());
        await user.save();
        res.cookie("AGENDA-AI-TOKEN", user.authentication.sessionToken, {
            domain: "localhost",
            path: "/",
        });
        return res.status(200).json({
            message: "User logged successfully",
            session: user.authentication.sessionToken,
            username: user.username,
            email: user.email,
        });
    }
    catch (err) {
        console.log(err);
        return res.sendStatus(400);
    }
};
exports.login = login;
const findBySession = async (req, res) => {
    const { sessionToken } = req.body;
    if (!sessionToken) {
        return res.status(400).json({ message: "Invalid session" });
    }
    const user = await (0, users_1.findUserBySessionToken)(sessionToken);
    if (!user) {
        return res.status(400).json({ message: "No user with that session" });
    }
    return res.json(user);
};
exports.findBySession = findBySession;
//# sourceMappingURL=auth.js.map