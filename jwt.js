const jwt = require("jsonwebtoken");

const jwtAuthMiddleware = (req, res, next) => {
  //first check the request headers has authorization or not
  const authorization = req.headers.authorization;
  if (!authorization) return res.status(401).json({ error: "Token not found" });

  //Extract the jwt token from the request headers
  const token = req.headers.authorization.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    // verify the JWT Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      expiresIn: 3000,
    });

    //Attach user information to request object
    req.user = decoded;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "Invalid Token" });
  }
};

//Function to generate token
const generateToken = (userData) => {
  //generate a new jwt token using user data
  return jwt.sign(userData, process.env.JWT_SECRET);
};

module.exports = { jwtAuthMiddleware, generateToken };
