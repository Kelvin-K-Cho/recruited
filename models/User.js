//Use mongoose for MongoDB.  Utilize the Schema provided by mongoose for structure.

const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  email: String,
  fullName: String,
  createdJobs: Array,
  submittedJobs: Array
});

mongoose.model("user", userSchema);
