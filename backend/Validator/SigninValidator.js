const validator = require("validator");
const isEmpty = require("./Empty");

module.exports = function SigninValidation(data) {
    let errors = {};

    // Convert empty fields to an empty string so we can use validator
    data.Email = !isEmpty(data.Email) ? data.Email : "";
    data.Password = !isEmpty(data.Password) ? data.Password : "";

    // Email checks
    if (validator.isEmpty(data.Email)) {
        errors.Email = "Email field is required";
    } else if (!validator.isEmail(data.Email)) {
        errors.Email = "Format Email required";
    }

    // Password checks
    if (validator.isEmpty(data.Password)) {
        errors.Password = "Password field is required";
    }
    return {
        errors,
        isValid: Object.keys(errors).length === 0,
    };
};