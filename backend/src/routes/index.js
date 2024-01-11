import { Router } from "express";
import { errorHandling, notFound } from "../controllers/error.controller.js";
import productRouter from "./product.route.js";
import userRouter from "./user.route.js";

const app = Router();

app.use("/api", productRouter);
app.use("/api", userRouter);

app.use("*", errorHandling);
app.use("*", notFound);

export default app;
