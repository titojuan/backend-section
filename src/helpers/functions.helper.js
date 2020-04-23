const responseError = ({ status, message }) => {
  const error = new Error()
  error.status = status
  error.message = message
  return error
}

const responseSuccess = ({ code = 200, status = true, data, message = '' }) => {
  const obj = {
    status,
    data,
    code,
    message
  }

  if ((message || '').trim().length === 0) {
    delete obj.message
  }

  return obj
}

module.exports = {
  responseError,
  responseSuccess
}
