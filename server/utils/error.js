export const createError = (status, message) => {
    const error = new Error();
    error.status = status;
    error.message = message;
    return error;
}

// Note: This error handler is used in index.js by root error handler.