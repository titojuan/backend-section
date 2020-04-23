const { createContainer, asClass, asValue, asFunction } = require('awilix')

// CONFIG
const config = require('../config')
const server = require('.')

const container = createContainer()

// SERVICES
const {
  HomeService,
  UserService,
  IdeaService,
  CommentService,
  AuthService
} = require('../services')

// CONTROLLERS
const {
  HomeController,
  UserController,
  IdeaController,
  CommentController,
  AuthController
} = require('../controllers')

// ROUTES
const Routes = require('../routes')
const {
  HomeRoutes,
  UserRoutes,
  IdeaRoutes,
  CommentRoutes,
  AuthRoutes
} = require('../routes/index.routes')

// MODELS
const { User, Idea, Comment } = require('../models')

// REPOSITORY
const { UserRepository, IdeaRepository, CommentRepository } = require('../repositories')

container
  .register({
    server: asClass(server).singleton(),
    router: asFunction(Routes).singleton(),
    config: asValue(config)
  })
  .register({
    AuthService: asClass(AuthService).singleton(),
    HomeService: asClass(HomeService).singleton(),
    UserService: asClass(UserService).singleton(),
    IdeaService: asClass(IdeaService).singleton(),
    CommentService: asClass(CommentService).singleton()
  })
  .register({
    AuthController: asClass(AuthController.bind(AuthController)).singleton(),
    HomeController: asClass(HomeController.bind(HomeController)).singleton(),
    UserController: asClass(UserController.bind(UserController)).singleton(),
    IdeaController: asClass(IdeaController.bind(IdeaController)).singleton(),
    CommentController: asClass(CommentController.bind(CommentController)).singleton()
  })
  .register({
    AuthRoutes: asFunction(AuthRoutes).singleton(),
    HomeRoutes: asFunction(HomeRoutes).singleton(),
    UserRoutes: asFunction(UserRoutes).singleton(),
    IdeaRoutes: asFunction(IdeaRoutes).singleton(),
    CommentRoutes: asFunction(CommentRoutes).singleton()
  })
  .register({
    User: asValue(User),
    Idea: asValue(Idea),
    Comment: asValue(Comment)
  })
  .register({
    UserRepository: asClass(UserRepository).singleton(),
    IdeaRepository: asClass(IdeaRepository).singleton(),
    CommentRepository: asClass(CommentRepository).singleton()
  })

module.exports = container
