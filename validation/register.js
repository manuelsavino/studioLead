const validator = require("validator");
const isEmpty = require("./is-Empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};
  if (!validator.isLength(data.firstName, { min: 2, max: 30 })) {
    errors.firstName = "First Name must be betweeen 2 and 30 characters";
  }

  if (!validator.isLength(data.lastName, { min: 2, max: 30 })) {
    errors.lastName = "Last Name must be betweeen 2 and 30 characters";
  }

  if (!validator.isLength(data.userName, { min: 5, max: 15 })) {
    errors.userName = " Username must be betweeen 5 and 15 characters";
  }

  if (!validator.isLength(data.password, { min: 8 })) {
    errors.password = "Password must be betweeen atleast 8 characters";
  }

  return { errors, isValid: isEmpty(errors) };
};
