const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

const auth = async (req , res , next) => {
   try {
    const token = req.header('Authorization').replace('Bearer ', '')
    const decoded = jwt.verify(token, 'key')
    // console.log(decoded);
    const user = await User.findOne({ _id: decoded._id, 'token': token })
//  console.log(user);
    if (!user) {
        return res.status(404).send();
    }

    // req.token = token
    req.user = user
    next()

   } catch (error) {
    res.status(401).send({ error: 'Please authenticate.' })
   }
}

module.exports = auth;