const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authentication = async (req, res, next) => {
  try {
    // Check if the 'Authorization' header is present
    if (!req.header('Authorization')) {
      throw new Error('Authorization header missing');
    }

    // Assuming the token is passed in the request headers as 'Authorization'
    const token = req.header('Authorization').replace('Bearer ', '');

    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Find the user by ID extracted from the token
    const user = await User.findById(decoded._id);

    if (!user) {
      console.log("User not found for the given token");
      throw new Error('User not found');
    }

    // Attach the user object and token to the request for further processing
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).send({ error: 'Please authenticate' });
  }
};

module.exports = authentication;
