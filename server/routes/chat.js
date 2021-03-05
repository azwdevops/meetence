const express = require("express");

const { auth } = require("../middleware/auth.js");

const { chatRoom } = require("../controllers/chat.js");

const router = express.Router();

router.post("/go-live/", chatRoom);

const chatRouter = router;

module.exports = chatRouter;
