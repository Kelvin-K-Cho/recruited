const mongoose = require('mongoose');
const requireLogin = require("../middlewares/requireLogin");

const matchingAlgorithm = require('../services/matchingAlgorithm');

const Resume = mongoose.model('resumes');
const Job = mongoose.model('jobs');
const User = mongoose.model('user');

module.exports = app => {

  app.get('/api/jobs/:id/resumes', requireLogin, (req, res) => {
    let job;
    Job.find({_id: req.params.id})
      .then((jobs) => {job = jobs[0];});
    Resume.find({_job: req.params.id})
      .populate("_user")
      .exec((err, resumes) => {
        if (err) { return res.send(err);}
        const matchedResumesArr = matchingAlgorithm(job, resumes); // if no keywrod found, it crashes, need fix
        const matchedResumes = {};
        //Populate a POJO using array functions
        matchedResumesArr.forEach(resume => {
          matchedResumes[resume.id] = resume;
        });
        //Send the payload to the frontend.
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
      approved: false,
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

  app.patch(`/api/resumes/:id`, requireLogin, (req, res) => {
    Resume.find({_id: req.params.id})
      .populate("_user")  // populate to nest the user info
      .then((resumes) => {
        console.log("FOunded");
        resumes[0].set(req.body); //update values from request body data
        resumes[0].save((err, updatedResume) => {
          console.log("sending");
          res.send(updatedResume);
        });
      });
  });
};
