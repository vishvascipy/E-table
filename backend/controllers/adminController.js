const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const adminSchema = require("../models/admin")

const SignupValidation = require("../Validator/SignupValidator");
const SigninValidation = require("../Validator/SigninValidator");

module.exports = {
    adminsignup: async (req, res) => {
        const { UserName, Email, Password } = req.body;

        const { errors, isValid } = SignupValidation(req.body);

        try {
            if (!isValid) {
                res.status(404).json(errors);
            } else {
                await adminSchema.findOne({ Email }).then(async (exist) => {
                    if (exist) {
                        errors.Email = "Email already in use";
                        res.status(404).json(errors);
                    } else {
                        const hashedPassword = bcrypt.hashSync(Password, 8);
                        const result = await adminSchema.create({
                            UserName,
                            Email,
                            Password: hashedPassword,
                        });
                        res.status(200).json({ result });
                    }
                });
            }
        } catch (error) {
            console.log(error.message);
        }
    },
    adminsignin: async (req, res) => {
        const { Email, Password } = req.body;
        const { errors, isValid } = SigninValidation(req.body);

        try {
            if (!isValid) {
                res.status(404).json(errors);
            } else {
                await adminSchema.findOne({ Email }).then(async (user) => {
                    if (!user) {
                        errors.Email =
                            "Email does not exist ! please Enter the right Email or You can make account";
                        res.status(404).json(errors);
                    }
                    // Compare sent in Password with found user hashed Password
                    const PasswordMatch = bcrypt.compareSync(Password, user.Password);
                    if (!PasswordMatch) {
                        errors.Password = "Wrong Password";
                        res.status(404).json(errors);
                    } else {
                        // generating a token and storing it in a cookie
                        const token = jwt.sign(
                            { _id: user._id },
                            "sooraj_DOING_GOOD",
                            {
                                expiresIn: "8h",
                            }
                        );

                        const data = {
                            id: user._id,
                        };

                        // console.log(data);
                        // res.cookie("Authorization", token, options);
                        res.status(201).json({
                            token,
                            data
                        });
                    }
                });
            }
        } catch (error) {
            console.log(error.message);
        }
    },
}