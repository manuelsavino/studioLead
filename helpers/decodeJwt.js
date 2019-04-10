const jwt = require("jsonwebtoken");

module.exports = {
  getStudioFromJwt(authorization) {
    const token = authorization.substring(7);
    return jwt.decode(token, { complete: true }).payload.studio;
  }
};
