function response(res, statusCode, message, data = null, error = null) {
    const response = {
        success: statusCode >= 200 && statusCode < 300,
        message: message,
        data: data,
        error: error
    };
    return res.status(statusCode).json(response);
}

module.exports = response;