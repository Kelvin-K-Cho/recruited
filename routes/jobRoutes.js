const mongoose = require('mongoose');
const requireLogin = require("../middlewares/requireLogin");
const Job = mongoose.model('jobs');

module.exports = app => {

  app.get('/api/jobs', requireLogin, (req, res) => {
    Job.find({})
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

    const user = req.user.save();

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

    job.save((err) => {
      if (err) { return res.send(err); }
      res.send(user.job);
    });

  });


};
