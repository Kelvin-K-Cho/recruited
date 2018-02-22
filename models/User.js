const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  email: String,
  fullName: String
});

mongoose.model("user", userSchema);
