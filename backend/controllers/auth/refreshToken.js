const jwt = require("jsonwebtoken");

const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.body.refreshToken; // Retrieve the refresh token from the request

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Invalid refresh token" });
      }

      // Generate a new access token
      const newAccessToken = jwt.sign(
        { userId: decoded.userId, email: decoded.email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "24h",
        }
      );

      return res.json({ accessToken: newAccessToken });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Error occurred. Please try again");
  }
};

module.exports = refreshToken;
