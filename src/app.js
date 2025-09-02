import cors from "cors";
import express from "express";
import helmet from "helmet";
import mongoose from 'mongoose';
import morgan from "morgan";

import api from "./api/index.js";

import * as middlewares from "./middlewares.js";

const connectToDatabase = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/shop');
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Exit the process if the connection fails
    }
};
const app = express();
connectToDatabase();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "🦄🌈✨👋🌎🌍🌏✨🌈🦄",
  });
});

app.use("/api/v1", api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
