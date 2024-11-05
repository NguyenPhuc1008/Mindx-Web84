import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }

})

const UsersModel = mongoose.model.user || mongoose.model('user', userSchema)
export default UsersModel
