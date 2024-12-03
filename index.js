import express from "express";
import cookieParser from "cookie-parser";
import connectMongoDB from "./src/config/db/db.js";
import Card from "./src/models/Card.js";
import Colors from "./src/models/Colors.js";
import DetailColor from "./src/models/DetailColor.js";
import { Server } from "socket.io";

connectMongoDB();

const app = express();

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

app.get("/", (req, res) => {
    console.log("CONG HIEU DEP TRAI");
    res.send("cong hieu dep trai!");
});

app.get("/data", async (req, res) => {
    res.send({ text: "HELLO WORLD!" });
});

app.post("/scan-card", async (req, res) => {
    const cardId = req.body.cardId;
    try {
        console.log(cardId);
        const find = await Card.findOne({ cardId: cardId });
        if (find) {
            console.log("the card has been created");
            res.status(200).send("received!");
        } else {
            console.log("the card isn't exist");
            res.status(404).send("not found!");

            // const newCard = new Card({ cardId: cardId });
            // await newCard.save();
            // console.log("the card is created successfully");
        }
    } catch (error) {
        res.status(500).send("errors!");
    }
});

app.post("/colors", async (req, res) => {
    let color = req.body.color;
    color = color.toUpperCase();
    try {
        const ExistColor = await Colors.findOne({ classify: color });
        if (ExistColor) {
            const newDetailColor = new DetailColor({
                classified: ExistColor._id,
            });
            ExistColor.quantity += 1;
            await ExistColor.save();
            await newDetailColor.save();
            res.status(201).send("The color is exist!");
        } else {
            const newColor = new Colors({ classify: color });
            const newDetailColor = new DetailColor({
                classified: newColor._id,
            });
            await newColor.save();
            await newDetailColor.save();
            res.status(200).send(
                "The color is created and appended successful!"
            );
        }
    } catch (err) {
        res.status(500).send("errors! in COLORs");
    }
});

app.get("/colors/quantity/:queryColor", async (req, res) => {
    let { queryColor } = req.params;
    try {
        queryColor = queryColor.toUpperCase();
        const color = await Colors.findOne({ classify: queryColor });
        res.status(200).send({ quantity: color.quantity });
    } catch (err) {
        res.status(404).send({ message: `NOT FOUND '${queryColor}'` });
    }
});

app.get("/colors/quantity", async (req, res) => {
    const { color } = req.params;
    const colors = await Colors.find({});
    const quantity = colors.reduce((total, color) => {
        return total + color.quantity;
    }, 0);
    res.status(200).send({ quantity });
});

app.listen(8000, () => {
    console.log("listening port http://localhost:8000");
});

// #include <Arduino.h>
// #include <ESP8266WiFi.h>
// #include <ESP8266HTTPClient.h>
// #include <WiFiClient.h>
// #include <SoftwareSerial.h>
// #define RX 13
// #define TX 15
// #define led D6

// SoftwareSerial arduinoSerial(RX, TX);

// const char* ssid = "Tenda_4770E0";
// const char* pass = "Tenda_4770E0";
// // const char* ssid = "Anh Chay backup";
// // const char* pass = "Anhchay26121969";

// // const char* host= "192.168.78.102";
// const char* host= "192.168.0.101";
// const uint16_t port = 8000;

// void setup() {
//   Serial.begin(115200);
//   arduinoSerial.begin(9600);
//   Serial.print("\n\n\n");
//   WiFi.begin(ssid, pass);
//   pinMode(led, OUTPUT);
//   while(WiFi.status() != WL_CONNECTED) {
//     Serial.println("Connecting wifi ...");
//     digitalWrite(led, 1);
//     delay(50);
//     digitalWrite(led, 0);
//   }
//   digitalWrite(led, 1);
//   Serial.println("\nConnected wifi\n");
// }

// void loop() {
//   if(arduinoSerial.available() && WiFi.status() == WL_CONNECTED) {
//     Serial.print("\n[HTTP] begin...\n");
//     HTTPClient http;
//     WiFiClient client;
//     http.begin(client, "http://" + String(host) + ":" + String(port) + "/scan-card");
//     http.addHeader("Content-Type", "application/x-www-form-urlencoded");
//     String httpRequestData = "cardId=" + arduinoSerial.readString();
//     int httpResponseCode = http.POST(httpRequestData);
//     if(httpResponseCode == 200) {
//       arduinoSerial.write("correct");
//     } else if(httpResponseCode == -1) {
//       arduinoSerial.write("disconnect");
//     } else {
//       arduinoSerial.write("incorrect");
//     }
//     http.end();
//     Serial.println("\n");
//   }
//   delay(10);
// }
