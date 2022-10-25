const mongoose = require("mongoose");

const heroSchema = new mongoose.Schema(
  {
    nickname: {
      type: String,
      required: [true, "Set nickname for hero"],
    },
    real_name: {
      type: String,
    },
    origin_description: {
      type: String,
    },
    superpowers: {
      type: [String],
    },
    catch_phrase: {
      type: String,
    },
    images: {
      type: [String],
    },
  },
  { versionKey: false }
);

const Hero = mongoose.model("Hero", heroSchema);

module.exports = { Hero };
