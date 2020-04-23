const { JwtHelper, Functions } = require('../helpers')

const { responseError, responseSuccess } = Functions
let _userService = null

class AuthService {
  constructor({ UserService }) {
    _userService = UserService
  }

  async signUp(user) {
    const { username } = user
    const userExist = await _userService.getUserByUsername(username)

    if (userExist) {
      throw responseError({
        status: 401,
        message: 'User already exist'
      })
    }

    return await _userService.create(user)
  }

  async signIn(user) {
    const { username, password } = user
    const userExist = await _userService.getUserByUsername(username)

    if (!userExist) {
      throw responseError({
        status: 404,
        message: 'User does not exist'
      })
    }

    const validPassword = userExist.comparePasswords(password)
    if (!validPassword) {
      throw responseError({
        status: 400,
        message: 'Invalid password'
      })
    }

    const userToEncode = {
      id: userExist._id,
      username: userExist.username
    }

    const token = JwtHelper.generateToken(userToEncode)

    return responseSuccess({
      data: {
        user: userExist,
        token
      },
      message: 'User created'
    })
  }
}

module.exports = AuthService
