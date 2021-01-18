import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.js";

// signup controller
export const signup = async (req, res) => {
  const {
    first_name,
    last_name,
    username,
    email,
    password,
    confirm_password,
  } = req.body;

  try {
    // try finding user using either username or email
    const existingUser = await User.findOne({ email, username });
    if (existingUser)
      return res.status(400).json({ message: "email/username taken" });

    // match the passwords first
    if (password !== confirm_password)
      return res.status(400).json({ message: "passwords must match" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      first_name,
      last_name,
      email,
      username,
      password: hashedPassword,
    });

    const token = jwt.sign({ email: user.email, id: user._id }, "test", {
      expiresIn: "1h",
    });

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

// login controller
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // try getting the user
    const existingUser = await User.findOne({ email });
    // if no user return invalid user
    if (!existingUser) return res.status(404).json({ message: "invalid user" });

    // if user get the password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    // if password is wrong return invalid login
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "invalid login" });

    // test word below is a secret string this should be stored in say an env file and should be complex

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "test",
      { expiresIn: "1h" }
    );

    res.status(200).json({ user: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};
