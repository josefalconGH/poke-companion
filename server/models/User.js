// Purpose: User model
const { Schema, model } = require("mongoose");

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
  coronation_points: {
    type: Number,
    default: 0,
  },
  favorite_pokemon: {
    type: Schema.Types.ObjectId,
    ref: "Pokemon", // Reference to the Pokemon model
    default: null,
  },
  favorite_type: {
    type: String,
    default: null,
  },
  favorite_game_versions: {
    type: [String], // List of game versions, e.g., "firered", "red"
    default: [],
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

// create user model and export
const User = model("User", userSchema);
module.exports = User;
