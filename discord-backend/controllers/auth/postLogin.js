const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const postLogin = async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email: email.toLowerCase()})

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = 'JWT TOKEN';
            return res.status(201).json({
                user: {
                    email: user.email,
                    token: token,
                    username: user.username
                }
            })
        }
        return res.status(400).send("Invalid credentials. Please try again")

    } catch (err) {
        console.log(err);
        return res.status(500).send("Error occurred. Please try again");
    }
};

module.exports = postLogin;
