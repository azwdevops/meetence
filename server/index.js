// packages import
import express from "express";
import "dotenv/config.js"; // to help with loading of environment variables
import bodyParser from "body-parser";

import cors from "cors";

// DB config import
import "./db/connectDB.js";

// routes import
import userRoutes from "./routes/user.js";

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());

// routes
app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
