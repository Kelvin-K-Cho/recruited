const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
// const User = mongoose.model("user");
const Jobs = mongoose.model("jobs");

module.exports = app => {
  app.get('/api/users/:id', requireLogin, (req, res) => {
    console.log("hi");
    Jobs.find({_user: req.params.id})
      .then((jobs) => {
        console.log(jobs);
        res.send(jobs);
      });
  });
};
