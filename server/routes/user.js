const express = require("express");

const { login, signup, getUser, activate } = require("../controllers/user.js");

// middleware for authentication purposes
const { auth } = require("../middleware/auth.js");

const router = express.Router();

router.post("/signup/", signup);
router.post("/activate/", activate);
router.post("/login/", login);

//example applying auth, say getting user data, auth is between the url and the name, see below
router.get("/get-user-data/", auth, getUser);

const userRoutes = router;
module.exports = userRoutes;
