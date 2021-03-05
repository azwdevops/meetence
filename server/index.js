// packages import
const express = require("express");
require("dotenv").config(); // to help with loading of environment variables
const bodyParser = require("body-parser");
const http = require("http");
const mySocket = require("socket.io");

const cors = require("cors");

// DB config import
require("./db/connectDB.js");

// routes import
const { userRoutes, chatRoutes } = require("./routes/index.js");

const app = express();
app.use(cors());

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

const server = http.Server(app);
const io = mySocket(server, {
  cors: {
    origin: "*",
  },
});

// routes
app.use("/api/user/", userRoutes);
app.use("/api/chat/", chatRoutes);

io.on("connection", (socket) => {
  socket.on("join-room", (roomId, userId) => {
    socket.join(roomId);
    socket.to(roomId).broadcast.emit("user-connected", userId);
    socket.on("disconnect", () => {
      socket.to(roomId).broadcast.emit("user-disconnected", userId);
    });
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
