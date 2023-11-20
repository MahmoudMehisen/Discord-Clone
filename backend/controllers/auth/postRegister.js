const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const postRegister = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userExists = await User.exists({ email });

    if (userExists) {
      return res.status(409).send("E-mail already in use.");
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "24h",
      }
    );

    return res.status(201).json({
      user: {
        email: user.email,
        token: token,
        username: username,
        _id:user._id,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Error occurred. Please try again");
  }
};

module.exports = postRegister;
