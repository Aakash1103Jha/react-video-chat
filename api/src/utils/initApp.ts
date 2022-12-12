import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import { createServer } from "http";

import { errorhandler } from "../middlewares/errorHandler";

const app: Application = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.disable("x-powered-by");

app.get("/", async (_: Request, res: Response, next: NextFunction) => {});

app.use(errorhandler);

export const server = createServer(app);

export default app;
