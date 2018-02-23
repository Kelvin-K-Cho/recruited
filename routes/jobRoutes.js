const mongoose = require('mongoose');
const requireLogin = require("../middlewares/requireLogin");
const Job = mongoose.model('jobs');

module.exports = app => {

  app.get('/api/jobs', requireLogin, (req, res) => {
    //Find all the jobs.
    Job.find({})
    //Omit the following fields.
      .select({responsibilities: 0, qualifications: 0, experience: 0})
      //receive a promise that's an array of all jobs
      .then((jobsArr) => {
        //sort the jobs by dateCreated (ascending)
        jobsArr.sort(function(a,b){
          return a.dateCreated - b.dateCreated;
        });
        const jobs = {};
        //Populate a POJO using array functions
        jobsArr.forEach(job => {
          jobs[job.id] = job;
        });
        //Send the payload to the frontend.
        res.send(jobs);
      });
  });

  app.get('/api/jobs/:id', requireLogin, (req, res) => {
    Job.find({_id: req.params.id})
      .then((jobs) => {
        // console.log(req.user._id);
        res.send(jobs[0]);  // it returns as array so we have to get index 0
      });
  });

  //Double check with BW
  app.delete('/api/jobs/:id', requireLogin, (req, res) => {
    Job.findOne({_id: req.params.id, _user: req.user._id})
      .then((job) => {
        job.remove({_id: req.params.id});
        res.redirect('/jobs');
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

    job.save().then(
      res.send(user.job) // send job information for review
    );

  });


};
