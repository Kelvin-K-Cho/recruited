const mongoose = require('mongoose');
const { Schema }  = mongoose;

const resumeSchema = new Schema({
  resumeText: String,
  resumeHTML: String,
  _job: { type: Schema.Types.ObjectId, ref: 'Job'},
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  dateCreated: Date
});

mongoose.model('resumes', resumeSchema);
