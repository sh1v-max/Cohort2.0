const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body)
    next()
  } catch (error) {
    // passes to global errorHandler, which formats ZodError nicely
    next(error)
  }
}

module.exports = validate
