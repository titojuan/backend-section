if (process.env.NOD_ENV !== 'production') {
  require('dotenv').config()
}

module.exports = {
  PORT: process.env.API_PORT,
  MONGO_URI: process.env.MONGO_URI,
  APPLICATION_NAME: process.env.APPLICATION_NAME,
  JWT_SECRET: process.env.JWT_SECRET,
  CACHE_KEY: process.env.CACHE_KEY,
  SWAGGER_PATH: `../config/swagger/${process.env.SWAGGER_DOC}.json`,
  PAGINATION_SIZE_DEFAULT: 10
}