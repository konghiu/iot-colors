import express from "express";
import cookieParser from "cookie-parser";
import connect from "./src/config/db/db.js";
import colorsRouter from "./src/routes/colors.js";
import Colors from "./src/models/Colors.js";
import cors from "cors";
import { status } from "./src/config/db/db.js";

connect();

const app = express();

app.use(
    cors({
        origin: ["https://konghiu.github.io/client-colors/"],
        optionSuccessStatus: 200,
        credentials: true,
    })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
    res.header("Content-Type", "application/json;charset=UTF-8");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.use("/colors", colorsRouter);

app.get("/", (req, res) => {
    console.log("CONG HIEU DEP TRAI");
    res.send("cong hieu dep trai!");
});

app.get("/data", async (req, res) => {
    res.send({ text: "HELLO WORLD!", status });
});

app.get("/value", async (req, res) => {
    const colors = await Colors.find({});
    res.send({ text: "HELLO WORLD!", status });
});

app.listen(8000, () => {
    console.log("listening port http://localhost:8000");
});
