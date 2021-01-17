// packages import

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

// files imports
import config from "./config/keys.js";

const app = express();

app.use(cors());

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
