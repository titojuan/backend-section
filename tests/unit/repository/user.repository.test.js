const { UserRepository } = require('../../../src/repositories')
const mockingoose = require('mockingoose').default
const { User } = require('../../../src/models')
let {
  UserModelMock: { users, user }
} = require('../../mocks')

describe('User repository test', () => {
  beforeEach(() => {
    mockingoose.resetAll()
    jest.clearAllMocks()
  })

  it('Should return a user by id', async () => {
    const _user = { ...user }
    delete _user.password

    mockingoose(User).toReturn(user, 'findOne')
    const _userRepository = new UserRepository({ User })
    const expected = await _userRepository.get(_user.id)

    expect(JSON.parse(JSON.stringify(expected))).toMatchObject(_user)
  })

  it('Should return a user by username', async () => {
    const _user = { ...user }
    delete _user.password

    mockingoose(User).toReturn(user, 'findOne')
    const _userRepository = new UserRepository({ User })
    const expected = await _userRepository.getUserByUsername(_user.username)

    expect(JSON.parse(JSON.stringify(expected))).toMatchObject(_user)
  })

  it('Should return a user collection', async () => {
    users = users.map(row => {
      delete row.password
      return row
    })

    mockingoose(User).toReturn(users, 'find')
    const _userRepository = new UserRepository({ User })
    const expected = await _userRepository.getAll()

    expect(JSON.parse(JSON.stringify(expected))).toMatchObject(users)
  })

  it('Should update an especific user by id', async () => {
    const _user = { ...user }
    delete _user.password

    mockingoose(User).toReturn(_user, 'findOneAndUpdate')
    const _userRepository = new UserRepository({ User })
    const expected = await _userRepository.update(user._id, {
      name: 'Juan Alexis'
    })

    expect(JSON.parse(JSON.stringify(expected))).toMatchObject(user)
  })

  it('Should delete an especific user by id', async () => {
    mockingoose(User).toReturn(user, 'findOneAndDelete')
    const _userRepository = new UserRepository({ User })
    const expected = await _userRepository.delete(user._id)

    expect(JSON.parse(JSON.stringify(expected))).toEqual(true)
  })
})
