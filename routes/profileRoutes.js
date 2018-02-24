const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
// const User = mongoose.model("user");
const Jobs = mongoose.model("jobs");
const Resumes = mongoose.model("resumes");

module.exports = app => {
  app.get('/api/users/:id', requireLogin, (req, res) => {
    let appliedJobs = [];
    let createdJobs = [];
    Jobs.find({_user: req.params.id})
    .then((jobs) => {
      // console.log(jobs);
      createdJobs = jobs;
    })
    .then( () => {

    Resumes.find({_user: req.params.id})
      .then((resumes) => {
        if (resumes.length === 0) {
          res.send({appliedJobs, createdJobs});
        }
        resumes.forEach((resume, idx) => {
          Jobs.find({_id: resume._job})
          .then(job => {
            appliedJobs.push(job[0]);
            if (idx === resumes.length-1) {
              console.log(appliedJobs);
              res.send({appliedJobs, createdJobs});
            }
          });
        });
      });});

      });



};
