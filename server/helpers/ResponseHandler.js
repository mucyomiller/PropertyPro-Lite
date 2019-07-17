class Respond {
  static response(res, statusCode, data, error = false) {
    if (error) {
      return res.status(statusCode).json({
        status: 'error',
        error: data
      });
    }
    return res.status(statusCode).json({
      status: 'success',
      data
    });
  }
}

export default Respond;
