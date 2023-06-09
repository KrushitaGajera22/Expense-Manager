const Constants = sails.config.constants;

module.exports = function (req, res, next) {
  try {
    let token = req.cookies.jwt;
    //verifying the token stored inside cookies
    Constants.jwt.verify(token, Constants.jwt_secret, (err, decoded) => {
      if (err) { throw err; }
      else {
        if (decoded.id !== (req.params.id || req.body.id)) {
          return res.status(401).send({ message: 'Unauthorized' });
        }
        else {
          next();
        }
      }
    });

  } catch (error) {
    console.log(error);
    return res.status(401).json({
      error: error
    });
  }
};