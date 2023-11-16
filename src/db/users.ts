import mongoose from "mongoose";

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  // cpf: { type: String, required: true, unique: true }, Removed because it was not necessary
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

export const UserModel = mongoose.model("User", userSchema);

// UserModel actions

// Returns all users
export const findAllUsers = () => {
  return UserModel.find({});
};

// Returns one user by email
export const findUserByEmail = (email: string) => {
  return UserModel.findOne({ email });
};

// Returns one user by cpf
// export const findUserByCpf = (cpf: string) => {
//   return UserModel.findOne({ cpf });
// };

// Returns one user by id
export const findUserById = (id: string) => {
  return UserModel.findById(id);
};

// Returns one user by sessionToken
export const findUserBySessionToken = (sessionToken: string) => {
  return UserModel.findOne({
    "authentication.sessionToken": sessionToken,
  }).select("+authentication.sessionToken");
};

// Creating one user
export const createUser = (user: Record<string, any>) => {
  return new UserModel(user).save().then((userObj) => userObj.toObject());
};

// Delete user by id
export const deleteUserById = (id: string) => {
  return UserModel.findByIdAndDelete({ _id: id });
};

// Delete user by email
export const deleteUserByEmail = (email: string) => {
  return UserModel.findOneAndDelete({ email });
};

// Delete user by cpf
export const deleteUserByCpf = (cpf: string) => {
  return UserModel.findOneAndDelete({ cpf });
};

// Update user by id
export const updateUserById = (id: string, user: Record<string, any>) => {
  return UserModel.findByIdAndUpdate(id, user);
};

// Update user by email
export const updateUserByEmail = (email: string, user: Record<string, any>) => {
  return UserModel.findOneAndUpdate({ email }, user);
};

// Update user by cpf
export const updateByCpf = (cpf: string, user: Record<string, any>) => {
  return UserModel.findOneAndUpdate({ cpf }, user);
};

export const deleteByCpf = (cpf: string) => {
  return UserModel.findOneAndDelete({ cpf });
};
export const deleteById = (id: string) => {
  return UserModel.findByIdAndDelete({ _id: id });
};

export const deleteMany = () => {
  return UserModel.deleteMany({});
};
