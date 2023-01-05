import "reflect-metadata";
import "@shared/container";
import "express-async-errors";
import Cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import http from "http";
import { RouterSocket } from "routesSocket";

import { AppError } from "@shared/errors/AppError";
import createConnection from "@shared/typeorm";

import { router } from "./routes";

const app = express();
const server = http.createServer(app);

createConnection();

app.use(express.json());
app.use(Cors());
app.use(express.urlencoded({ extended: false }));
RouterSocket(server);
app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  return res.status(500).json({
    status: "error",
    message: `Internal server error - ${err.message}`,
  });
});
export { server };
