export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Default error
  let error = {
    message: err.message || 'Internal Server Error',
    status: err.status || 500
  };

  // Validation error
  if (err.name === 'ValidationError') {
    error.status = 400;
    error.message = err.details?.[0]?.message || 'Validation Error';
  }

  // Database errors
  if (err.code === '23505') { // Unique constraint violation
    error.status = 409;
    error.message = 'Resource already exists';
  }

  if (err.code === '23503') { // Foreign key constraint violation
    error.status = 400;
    error.message = 'Referenced resource does not exist';
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    error.status = 401;
    error.message = 'Invalid token';
  }

  if (err.name === 'TokenExpiredError') {
    error.status = 401;
    error.message = 'Token expired';
  }

  res.status(error.status).json({
    error: error.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};