import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: true
        },
        img: {
            type: String,
        },
        subscribers: {
            type: Number,
            default: 0,
            min: 0
        },
        subscribedUsers: {
            type: [String], // To insert channels user id
        }
    },
    { timestamps: true }

);

export default mongoose.model("User", UserSchema)