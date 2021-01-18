import mongoose from "mongoose";

const Schema = mongoose.Schema;
const Model = mongoose.model;

const userSchema = Schema({
  first_name: { type: String, required: true, trim: true },
  last_name: { type: String, required: true, trim: true },
  username: {
    type: String,
    required: true,
    unique: true,
    dropDups: true,
    index: true,
    sparse: true,
    trim: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    dropDups: true,
    index: true,
    sparse: true,
    trim: true,
    lowercase: true,
  },
  password: { type: String, required: true },
  id: { type: String },
  is_active: { type: Boolean, default: "false" },
});

// model for storing tokens to use for user accoutn verification
const confirmationCodeSchema = Schema({
  email: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
    expires: 3600,
  },
});

const User = Model("User", userSchema);
const ConfirmationCode = Model("ConfirmationCode", confirmationCodeSchema);

export default { User, ConfirmationCode };
