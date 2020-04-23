const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config')
const { Functions } = require('../helpers')

const { responseError, responseSuccess } = Functions

module.exports = (req, res, next) => {
  const token = req.headers['authorization']
  if (!token) {
    throw responseError({
      status: 400,
      message: 'Token must be sent'
    })
  }

  jwt.verify(token, JWT_SECRET, function(err, decodedToken) {
    if (err) {
      throw responseError({
        status: 401,
        message: 'Invalid token'
      })
    }

    req.user = decodedToken.user
    next()
  })
}
