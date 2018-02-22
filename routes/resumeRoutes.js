const mongoose = require('mongoose');
const requireLogin = require("../middlewares/requireLogin");
const Resume = mongoose.model('resumes');

module.exports = app => {
  app.get('/api/jobs/:id/resumes', requireLogin, (req, res) => {
    Resume.find({_job: req.params.id})
      .then((resumes) => {
        res.send(resumes);
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
