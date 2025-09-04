import cors from "cors";
import express from "express";
import helmet from "helmet";

import morgan from "morgan";

import api from "./api/index.js";

import { connectToDatabase } from "./database.js";
import * as middlewares from "./middlewares.js";

const app = express();
console.log("ENV: ", process.env.NODE_ENV);
connectToDatabase();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api/v1", api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
