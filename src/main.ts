import http from "http";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import router from "./routers";

// dotenv.config();

// Connecting to the database

dotenv.config({ path: "./.env" });
// Replace with your MongoDB connection string
if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in .env file");
}

mongoose.connect(process.env.MONGODB_URI);

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
server.listen(5000, () => {
  console.log(`Server running on port 5000`);
});
