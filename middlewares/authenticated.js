const jwt = require('jsonwebtoken');
const boom = require('@hapi/boom');
const authenticated = async (req, res, next) => {
  //Check for JWT TOken
  try {
    const token = req.header('x-auth-token');
    console.log(process.env.JWTSECRET);
    if (!token) {
      return SEND_RESPONSE(boom.unauthorized('Tokan is not Valid..'), res);
    }
    //Verify Token

    const decoded = jwt.verify(token, process.env.JWTSECRET);
    //assign User to Req.user
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err);
    SEND_RESPONSE(boom.unauthorized('You are Unauthorized to login'), res);
  }
};
module.exports = authenticated;