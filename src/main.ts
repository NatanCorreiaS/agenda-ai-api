import http from "http";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import router from "./routers";

dotenv.config();

// Connecting to the database

mongoose.connect(process.env.MONGO_URL);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

db.once("open", () => {
  console.log("Connected to the database");
});

// Creating the app
const app = express();

// Using Middlewares
app.use(bodyParser.json());
app.use(compression());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
  })
);
app.use(router());

// Creating the server instance
const server = http.createServer(app);

// Listening to the server
server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
