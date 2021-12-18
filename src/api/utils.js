module.exports = {
  response: (requestId, statusCode, responseBody = {}) => {
    return {
      requestId: requestId,
      statusCode: statusCode,
      content: responseBody
    }
  }
}