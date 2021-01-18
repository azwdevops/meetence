import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  username: { type: String, required: true, unique: true, dropDups: true },
  email: { type: String, required: true, unique: true, dropDups: true },
  password: { type: String, required: true },
  id: { type: String },
});

export default mongoose.model("User", userSchema);
