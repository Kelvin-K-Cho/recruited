const mongoose = require('mongoose');
const requireLogin = require("../middlewares/requireLogin");
const Job = mongoose.model('jobs');

module.exports = app => {

  app.get('/api/jobs', requireLogin, (req, res) => {
    Job.find({})
      .select({responsibilities: 0, qualifications: 0, experience: 0})
      .then((jobsArr) => {
        const jobs = {};
        jobsArr.forEach(job => {
          jobs[job.id] = job;
        });
        res.send(jobs);
      });
  });

  app.get('/api/jobs/:id', requireLogin, (req, res) => {
    Job.find({_id: req.params.id})
      .then((jobs) => {
        res.send(jobs[0]);  // it returns as array so we have to get index 0
      });
  });

  app.post('/api/jobs', requireLogin, (req, res) => {
    const {
      title,
      type,
      company,
      company_url,
      location,
      salaryEstimate,
      responsibilities,
      qualifications,
      experience,
      summary
    } = req.body;

    const user = req.user.save();

    const job = new Job({
      title,
      type,
      company,
      company_url,
      location,
      salaryEstimate,
      responsibilities,
      qualifications,
      experience,
      summary,
      _user: req.user.id,
      dateCreated: Date.now()
    });

    job.save((err) => {
      if (err) { return res.send(err); }
    }).then(() => {
      res.send(user.job); // send job information for review
    });

  });


};
