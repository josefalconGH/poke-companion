// Purpose: Items model
const { Schema, model } = require("mongoose");

// create items schema
const itemsSchema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  effect: {
    type: String,
    required: true,
    trim: true,
  },
});

// create items model and export
const Items = model("Items", itemsSchema);
module.exports = Items;
