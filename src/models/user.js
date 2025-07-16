
import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
})


export const userModel =
    mongoose.models.user || mongoose.model("user", userSchema);

