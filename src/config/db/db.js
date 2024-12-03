import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export default function () {
    mongoose
        .connect(
            "mongodb+srv://conghieudev3104:abcd1234@db.p1jyv.mongodb.net?retryWrites=true&w=majority&appName=db"
        )
        .then(() => console.log("connect success"))
        .catch(() => console.log("connect failure"));
}
