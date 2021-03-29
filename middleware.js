const User = require('./schemas/User')
const jwt = require('jsonwebtoken')

const validateEmailExist = async (req, res, next) => {
   try {
      const user = await User.findOne({email: req.body.email})
      if (user) {
         res.status(400).send('Email already exist')
      }
   } catch (err) {
      res.status(400).send(err)
   }
   next();
}

const verify = async (req, res, next) => {
   const token = req.header('Authorization')
   if (!token) res.status(401).send('Access Denied')
   else {
      try {
         req.user = jwt.verify(token, process.env.TOKEN_SECRET)
         next();
      } catch (err) {
         res.status(400).send('Invalid Token')
      }
   }
}

module.exports = {
   validateEmailExist,
   verify
}