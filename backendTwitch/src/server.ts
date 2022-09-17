import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import "express-async-errors";

import { router } from "./routes";
import { AppError } from "./Error/AppError";
import "./shared/container";

const app = express();

app.use(cors());
app.use(router);

app.use(express.json());

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }
  }
);

app.listen(3333, () => {
  console.log("Application is Running!");
});
