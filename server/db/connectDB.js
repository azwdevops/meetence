const mongoose = require("mongoose");

// connect to mongodb

mongoose
  .connect(process.env.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("MongoDB connected...");
  })
  .catch((err) => console.log(err.message));
