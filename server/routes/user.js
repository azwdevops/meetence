import express from "express";

import { login, signup, getUser, activate } from "../controllers/user.js";

// middleware for authentication purposes
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/signup/", signup);
router.post("/activate/", activate);
router.post("/login/", login);

//example applying auth, say getting user data, auth is between the url and the name, see below
router.get("/get-user-data/", auth, getUser);

export default router;
