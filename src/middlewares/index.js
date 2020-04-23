module.exports = {
  ErrorMiddleware: require('./error.middleware'),
  NotFoundMiddleware: require('./not-found.middleware'),
  AuthMiddleware: require('./auth.middleware'),
  ParseInMiddleware: require('./parse-int.middleware'),
  CacheMiddleware: require('./cache.middleware')
}
