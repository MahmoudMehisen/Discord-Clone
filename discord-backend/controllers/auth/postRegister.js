const User = require('../../models/user')
const bcrypt = require("bcryptjs")
const postRegister = async (req, res) => {
    try {
        const {username, email, password} = req.body;

        const userExists = await User.exists({email})

        if (userExists) {
            return res.status(409).send("E-mail already in use.");
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email: email.toLowerCase(),
            password: encryptedPassword,
        })

        const token = 'JWT TOKEN';

        return res.status(201).json({
            user: {
                email: user.email,
                token: token,
                username: username
            }
        })

    } catch (err) {
        console.log(err);
        return res.status(500).send("Error occurred. Please try again");
    }
};

module.exports = postRegister;
