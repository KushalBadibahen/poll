const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    id:{type: String, required: true},
    name:{type: String, required: true},
    phone:{type: String, required: true},
    ans:{type: String, required: true}
  },
  { timestamps: true }
);

module.exports = mongoose.model("poll", userSchema);