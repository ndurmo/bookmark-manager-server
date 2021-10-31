import express from "express";
import mongoose from "mongoose";

import authRoutes from "./routes/authRoutes";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/auth", authRoutes);

app.use((error, req, res, next) => {
  res.status(error.statusCode).send(error);
});

mongoose
  .connect(process.env.CONNECTION_STRING, { useUnifiedTopology: true })
  .then((result) => {
    app.listen(port);
  })
  .catch((error) => {
    console.log(error);
  });
