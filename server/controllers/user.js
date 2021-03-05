const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// utils functions
const mailer = require("../utils/mailer.js");

// models
const user = require("../models/user.js");

// validators
const { validatePassword } = require("../utils/validators.js");

// destructuring
const { User, ConfirmationCode } = user;
const { transporter, ActivationEmail } = mailer;

const SECRET = process.env.SECRET; // for signing tokens
const EMAIL_SECRET = process.env.EMAIL_SECRET; // for signing emails

//======================== SIGNUP USER ==========================//
exports.signup = async (req, res) => {
  console.log("CONTROLLER OKAY");
  const {
    first_name,
    last_name,
    username,
    email,
    password,
    confirm_password,
  } = req.body;

  // validate password returns an array with index 1 as message, and index 2 as boolean

  if (!validatePassword(password)[1])
    return res.status(400).json({ msg: validatePassword(password)[0] });

  try {
    // try finding user using either username or email
    const existingUser = await User.findOne({ email, username });
    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(400).json({ msg: "email taken" });
      } else if (existingUser.username === username) {
        return res.status(400).json({ msg: "email taken" });
      }
    }

    // match the passwords first
    if (password !== confirm_password)
      return res.status(400).json({ msg: "passwords must match" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      first_name,
      last_name,
      email,
      username,
      password: hashedPassword,
    });

    // send user activation email
    jwt.sign(
      { id: user._id },
      EMAIL_SECRET,
      { expiresIn: "2h" },
      (err, emailToken) => {
        const url = `${process.env.DOMAIN}/user/activate/${emailToken}/`;
        transporter.sendMail(ActivationEmail(user.email, user.username, url));
      }
    );

    // no token during signup since users need to activate their account
    // const token = jwt.sign({ email: user.email, id: user._id }, secret, {
    //   expiresIn: "1h",
    // });

    res
      .status(201)
      .json({ msg: "Success. Check your email for the activation link." });
  } catch (error) {
    res.status(500).json({ msg: "something went wrong" });
    console.log(error);
  }
};

// ========================   ACTIVATE ACCOUNT ========================//
exports.activate = async (req, res) => {
  const token = req.body.token;
  try {
    const decodedToken = jwt.verify(token, EMAIL_SECRET);
    const userId = decodedToken?.id;
    const user = await User.findById({ _id: userId });
    if (!user) return res.status(400).json({ msg: "activation failed" });

    // is account is active return error
    if (user.is_active)
      return res.status(400).json({ msg: "account is already active" });

    // activate user
    await User.findByIdAndUpdate(
      { _id: userId },
      { is_active: true },
      (err, result) => {
        if (err) return res.status(400).json({ msg: err });
        else return res.status(200).json({ msg: "account activated" });
      }
    );
  } catch (error) {
    console.log(error);
  }
};

//======================== LOGIN USER ===============================//
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // try getting the user
    const existingUser = await User.findOne({ email });
    // if no user return invalid user
    if (!existingUser) return res.status(400).json({ msg: "invalid user" });

    // if user get the password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    // if password is wrong return invalid login
    if (!isPasswordCorrect)
      return res.status(400).json({ msg: "invalid login" });

    // check if user has activated their account
    if (!existingUser.is_active)
      return res
        .status(400)
        .json({ msg: "Please activate your account to login" });

    // the SECRET key below is a secret string this should be stored in say an env file and should be complex

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({ user: existingUser, token });
  } catch (error) {
    res.status(500).json({ msg: "something went wrong" });
  }
};

//======================= GET USER ========================//
exports.getUser = async (req, res) => {
  if (!req.userId) {
    return res.json({ msg: "unauthenticated" });
  }
  // if req.userId store the value in id const
  const userId = req.userId;
  // try getting user with associated id
  const user = await User.findById({ _id: userId });
  // if no user return invalid user
  if (!user) return res.status(404).json({ msg: "invalid user" });

  // check if user has activated their account
  if (!user.is_active)
    return res.status(400).json({ msg: "Please activate your account" });

  // return user details if user was found
  const user_data = {
    first_name: user.first_name,
    last_name: user.last_name,
    username: user.username,
    email: user.email,
    id: user._id,
  };

  res.status(200).json({ user: user_data });

  try {
  } catch (error) {
    res.status(500).json({ msg: "something went wrong" });
  }
};
