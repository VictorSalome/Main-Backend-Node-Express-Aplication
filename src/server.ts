import express from "express";
import dotenv from "dotenv";
import { authRoutes } from "./routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running in ${process.env.NODE_ENV} mode`);
  console.log(`Server is running on port ${PORT}, http://localhost:${PORT}`);
});
