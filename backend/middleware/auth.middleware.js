const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const protect = asyncHandler(async (req, res, next) => {

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) { // Jogosultság header létezése , annak Bearerrel való kezdése ellenörzés
    try {
      // Get token from header

      token = req.headers.authorization.split(' ')[1]; // Token és Bearer közti space kivágása a jogosultság headerből , majd annak a [1] token kikérése

      // Verify token;
      const decoded = jwt.verify(token, process.env.JWT_SECRET) // Token konvertálása Userré

      //Get user from the token

      req.user = await User.findById(decoded.id).select('-password') // Nem kérjük a user passwordjét de kérjük a konvertált user id alapján a usert

      next(); // Tovább léptetjük
      if (!token) {
        res.status(401)
        throw new Error('Not authorized nmo token')
      }

    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error('Not authorized')
    }

  }

})

module.exports = { protect };