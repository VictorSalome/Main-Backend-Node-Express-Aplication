import express from "express";
import dotenv from "dotenv";
import { Routes } from "./routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());


app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api", Routes);

app.listen(PORT, () => {
  console.log(`Server is running in ${process.env.NODE_ENV} mode`);
  console.log(`Server is running on port ${PORT}, http://localhost:${PORT}`);
});
