const mongoose = require('mongoose');
const requireLogin = require("../middlewares/requireLogin");

const matchingAlgorithm = require('../services/matchingAlgorithm');

const Resume = mongoose.model('resumes');
const Job = mongoose.model('jobs');

module.exports = app => {
  app.get('/api/jobs/:id/resumes', requireLogin, (req, res) => {
    let job;
    Job.find({_id: req.params.id})
      .then((jobs) => {job = jobs[0];});
    Resume.find({_job: req.params.id})
      .then((resumes) => {
        const matchedResumes = matchingAlgorithm(job, resumes); //
        res.send(matchedResumes);
      });
  });

  app.post('/api/resumes', requireLogin, (req, res) => {
    const {
      resumeText,
      resumeHTML,
      _job
    } = req.body;

    const user = req.user.save();

    const resume = new Resume({
      resumeText,
      resumeHTML,
      _job,
      _user: req.user.id,
      dateCreated: Date.now()
    });

    resume.save((err) => {
      if (err) { return res.send(err); }
    }).then(() => {
      res.send(user.resume); // send resume information for review
    });

  });
};
