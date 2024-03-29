import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import path from "path";
import { URL } from "url";

import mainRoutes from "./routes/main.js";
import dashboardRoutes from "./routes/dashboard.js";
import userRoutes from "./routes/user.js";

// const __filename = url.fileURLToPath(import.meta.url);
const __filename = new URL("", import.meta.url).pathname;
const __dirname = path.dirname(__filename);

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

try {
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log(`MongoDB Connected: ${conn.connection.host}`);
} catch (err) {
  console.error(err);
  process.exit(1);
} finally {
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
}

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", mainRoutes);
app.use("/api/users", userRoutes);
app.use("/api/:user", dashboardRoutes);

if (process.env.NODE_ENV === "production") {
  const htmlPath = path.join(path.join(__dirname, "client", "dist"));
  app.use(express.static(htmlPath));
}
