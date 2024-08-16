// Purpose: TypeEffectiveness model
const { Schema, model } = require("mongoose");

// create typeEffectiveness schema
const typeEffectivenessSchema = new Schema({
  type: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  no_effect: {
    type: [String],
    required: true,
  },
  not_very_effective: {
    type: [String],
    required: true,
  },
  normal_effective: {
    type: [String],
    required: true,
  },
  super_effective: {
    type: [String],
    required: true,
  },
});

// create typeEffectiveness model and export
const TypeEffectiveness = model("TypeEffectiveness", typeEffectivenessSchema);
module.exports = TypeEffectiveness;
