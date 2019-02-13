const validator = require("validator");
const isEmpty = require("./is-Empty");

module.exports = function validateLogin(data) {
  let errors = {};
  if (!validator.isLength(data.username, { min: 1, max: 30 })) {
    errors.firstName = "First Name must be betweeen 2 and 30 characters";
  }

  if (!isEmpty(data.username)) {
    errors.userName = "Username cant be blank";
  }

  if (!isEmpty(data.password)) {
    errors.userName = "Username cant be password";
  }

  return { errors, isValid: isEmpty(errors) };
};
