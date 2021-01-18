import express from "express";

import { login, signup } from "../controllers/user.js";

// middleware for authentication purposes
import auth from "../middleware/auth.js";

const router = express.Router();

// login route
router.post("/login/", login);
router.post("/signup/", signup);

//example applying auth, say getting user data, auth is between the url and the name, see below
// router.get('/get-user-data/',auth, getUserData)

export default router;
