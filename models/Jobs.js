const mongoose = require('mongoose');
const { Schema }  = mongoose;

const jobSchema = new Schema({
  title: String,
  summary: String,
  responsibilities: String,
  qualifications: String,
  type: String,
  experience: String,
  location: String,
  salaryEstimate: Number,
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  dateCreated: Date
});

mongoose.model('jobs', jobSchema);
