import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export let status = "ok";

export default function () {
    mongoose
        .connect(process.env.MONGODB_URL)
        .then(() => {
            status = "alright";
            console.log("connect success");
        })
        .catch(() => {
            status = "error";
            console.log("connect failure");
        });
}
