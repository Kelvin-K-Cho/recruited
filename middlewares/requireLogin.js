//Similar to "before_action: require_login" from rails. This helper function protects
//our website from any action unless the user is logged in.

module.exports = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({ error: 'You must login first' });
  }

  next();
};
