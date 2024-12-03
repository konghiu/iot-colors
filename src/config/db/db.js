import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export let status = "ok";

export default async function () {
    await mongoose
        .connect(
            "mongodb+srv://conghieudev3104:abcd1234@db.p1jyv.mongodb.net/?retryWrites=true&w=majority&appName=db"
        )
        .then(() => {
            status = "alright";
            console.log("connect success");
        })
        .catch(() => {
            status = "error";
            console.log("connect failure");
        });
}
