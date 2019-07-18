class Respond {
  static response(res, statusCode, data, error = false, isSuccessMsg = false) {
    if (error) {
      return res.status(statusCode).json({
        status: 'error',
        error: data
      });
    }
    if (isSuccessMsg) {
      return res.status(statusCode).json({
        status: 'success',
        message: data
      });
    }
    return res.status(statusCode).json({
      status: 'success',
      data
    });
  }
}

export default Respond;
