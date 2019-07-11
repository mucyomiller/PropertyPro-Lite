class Respond {
  static response(res, statusCode, data, error = false) {
    if (error) {
      return res.status(statusCode).json({
        status: statusCode,
        error: data
      });
    }
    return res.status(statusCode).json({
      status: statusCode,
      data
    });
  }
}

export default Respond;
