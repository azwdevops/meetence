// packages import
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

// files imports
import config from "./config/keys.js";

// routes import
import userRoutes from "./routes/user.js";

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());

// routes
app.use("/api/user", userRoutes);

// connect to mongodb

mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("MongoDB connected...");
  })
  .catch((err) => console.log(err.message));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
