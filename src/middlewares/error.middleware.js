module.exports = (err, req, res, next) => {
  const httpStatus = err.status || 500

  return res.status(httpStatus).send({
    status: false,
    code: httpStatus,
    message: err.message || 'Internal server error'
  })
}
