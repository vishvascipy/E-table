const validator = require("validator");
const isEmpty = require("./Empty");
const Regex = /^(?=.*\d)(?=.*[a-z])(?=.*[@#$%^&+=])(?=.*[A-Z]).{8,}/;
const Regex1 = /(?=.*[ ])/;
module.exports = function SignupValidation(data) {

    let errors = {};
    // Convert empty fields to an empty string so we can use validator
    data.UserName = !isEmpty(data.UserName) ? data.UserName : "";
    data.Email = !isEmpty(data.Email) ? data.Email : "";
    data.Password = !isEmpty(data.Password) ? data.Password : "";
    // Name checks
    if (validator.isEmpty(data.UserName)) {
        errors.name = " first Name field is required";
    }
    // Email checks
    if (validator.isEmpty(data.Email)) {
        errors.Email = "Email field is required";
    } else if (!validator.isEmail(data.Email)) {
        errors.Email = "Format Email required";
    }

    // Password checks
    if (validator.isEmpty(data.Password)) {
        errors.Password = "Password field is required";
    } else if ((!Regex.test(data.Password)) || (Regex1.test(data.Password))) {
        errors.Password = "Password should have 1 lowercase letter, 1 uppercase letter,1 special character,  1 number, and be at least 8 characters long";
    }
    // console.log(!Regex.test(data.Password))
    return {
        errors,
        isValid: Object.keys(errors).length === 0,
    };
};