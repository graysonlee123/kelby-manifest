module.exports = function (req, res, next) {
  const authenticated = true;

  if (!authenticated) {
    return res.status(401).json({ msg: 'No toke, you are not authorized.' });
  }

  next();
};
