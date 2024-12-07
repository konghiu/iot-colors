import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export let status = "ok";

async function connect() {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        status = "alright";
        console.log("connect successfull");
    } catch (err) {
        console.log("connect failure");
        status = "error";
    }
}

export default connect;
