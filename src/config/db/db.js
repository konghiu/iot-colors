import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export default function () {
    mongoose
        .connect(process.env.URL_MONGODB)
        .then(() => console.log("connect success"))
        .catch(() => console.log("connect failure"));
}
