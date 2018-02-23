const mongoose = require('mongoose');
const { Schema }  = mongoose;

const resumeSchema = new Schema({
  resumeText: String,
  resumeHTML: String,
  percentMatch: Number,
  approved: {type: Boolean, default: false},
  _job: { type: Schema.Types.ObjectId, ref: 'job'},
  _user: { type: Schema.Types.ObjectId, ref: 'user' },
  dateCreated: Date
});

mongoose.model('resumes', resumeSchema);
