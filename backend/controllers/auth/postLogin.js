const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });

    if (user && (await bcrypt.compare(password, user.password))) {
      const accessToken = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "24h",
        }
      );
      const refreshToken = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.REFRESH_TOKEN_KEY,
        {
          expiresIn: "30d", // Set the expiration for a longer period
        }
      );
      return res.status(201).json({
        user: {
          email: user.email,
          accessToken,
          username: user.username,
          refreshToken,
        },
      });
    }
    return res.status(400).send("Invalid credentials. Please try again");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Error occurred. Please try again");
  }
};

module.exports = postLogin;
