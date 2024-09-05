// Purpose: User model
import { Schema, model } from "mongoose";

// create user schema
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Must match an email address!"],
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

// create user model and export
export default model("User", userSchema);
