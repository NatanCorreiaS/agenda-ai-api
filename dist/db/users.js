"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMany = exports.deleteById = exports.deleteByCpf = exports.updateByCpf = exports.updateUserByEmail = exports.updateUserById = exports.deleteUserByCpf = exports.deleteUserByEmail = exports.deleteUserById = exports.createUser = exports.findUserBySessionToken = exports.findUserById = exports.findUserByEmail = exports.findAllUsers = exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    authentication: {
        password: {
            type: String,
            required: true,
            minlength: 8,
            maxlength: 64,
            select: false,
        },
        salt: { type: String, select: false },
        sessionToken: { type: String, select: false },
    },
});
exports.UserModel = mongoose_1.default.model("User", userSchema);
const findAllUsers = () => {
    return exports.UserModel.find({});
};
exports.findAllUsers = findAllUsers;
const findUserByEmail = (email) => {
    return exports.UserModel.findOne({ email });
};
exports.findUserByEmail = findUserByEmail;
const findUserById = (id) => {
    return exports.UserModel.findById(id);
};
exports.findUserById = findUserById;
const findUserBySessionToken = (sessionToken) => {
    return exports.UserModel.findOne({
        "authentication.sessionToken": sessionToken,
    }).select("+authentication.sessionToken");
};
exports.findUserBySessionToken = findUserBySessionToken;
const createUser = (user) => {
    return new exports.UserModel(user).save().then((userObj) => userObj.toObject());
};
exports.createUser = createUser;
const deleteUserById = (id) => {
    return exports.UserModel.findByIdAndDelete({ _id: id });
};
exports.deleteUserById = deleteUserById;
const deleteUserByEmail = (email) => {
    return exports.UserModel.findOneAndDelete({ email });
};
exports.deleteUserByEmail = deleteUserByEmail;
const deleteUserByCpf = (cpf) => {
    return exports.UserModel.findOneAndDelete({ cpf });
};
exports.deleteUserByCpf = deleteUserByCpf;
const updateUserById = (id, user) => {
    return exports.UserModel.findByIdAndUpdate(id, user);
};
exports.updateUserById = updateUserById;
const updateUserByEmail = (email, user) => {
    return exports.UserModel.findOneAndUpdate({ email }, user);
};
exports.updateUserByEmail = updateUserByEmail;
const updateByCpf = (cpf, user) => {
    return exports.UserModel.findOneAndUpdate({ cpf }, user);
};
exports.updateByCpf = updateByCpf;
const deleteByCpf = (cpf) => {
    return exports.UserModel.findOneAndDelete({ cpf });
};
exports.deleteByCpf = deleteByCpf;
const deleteById = (id) => {
    return exports.UserModel.findByIdAndDelete({ _id: id });
};
exports.deleteById = deleteById;
const deleteMany = () => {
    return exports.UserModel.deleteMany({});
};
exports.deleteMany = deleteMany;
//# sourceMappingURL=users.js.map