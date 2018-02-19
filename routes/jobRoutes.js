const requireLogin = require("../middlewares/requireLogin");

module.exports = app => {
  app.post('/api/jobs', requireLogin, (req, res) => {
    
  });
};
