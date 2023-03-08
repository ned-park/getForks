import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";

import mainRoutes from "./routes/main.js";
import dashboardRoutes from "./routes/dashboard.js";
import userRoutes from "./routes/user.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

try {
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });

  console.log(`MongoDB Connected: ${conn.connection.host}`);
} catch (err) {
  console.error(err);
  process.exit(1);
}

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", mainRoutes);
app.use("/api/users", userRoutes);
app.use("/api/:user", dashboardRoutes);
