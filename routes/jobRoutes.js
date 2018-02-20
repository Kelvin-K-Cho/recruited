const mongoose = require('mongoose');
const requireLogin = require("../middlewares/requireLogin");
const Job = mongoose.model('jobs');

module.exports = app => {

  app.get('/api/jobs', requireLogin, (req, res) => {
    Job.find({ _user: req.user.id })
      .then((jobs) => (
        res.send(jobs)
      ));
  });

  app.post('/api/jobs', requireLogin, (req, res) => {
    const {
      title,
      summary,
      responsibilities,
      qualifications,
      type,
      experience,
      location,
      salaryEstimate
    } = req.body;


    const job = new Job({
      title,
      summary,
      responsibilities,
      qualifications,
      type,
      experience,
      location,
      salaryEstimate,
      _user: req.user.id,
      dateCreated: Date.now()
    });
  });
};