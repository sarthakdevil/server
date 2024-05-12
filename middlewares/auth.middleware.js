import jwt from 'jsonwebtoken';
import AppError from '../utils/error.utils.js';
export const isLoggedIn = async (req, res, next) => {
  try {
    // Extracting token from the cookies
    const {token} = req.cookies

    console.log(token)
    // If no token, send an unauthorized message
    if (!token) {
      throw new AppError('Unauthorized, please login to continue', 401);
    }

    // Decoding the token using jwt package verify method
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // If decoding fails, send an unauthorized message
    if (!decoded) {
      throw new AppError('Unauthorized, please login to continue', 401);
    }

    // If all good, store the decoded payload in the req object
    req.user = decoded;

    // Do not forget to call the next, otherwise, the flow of execution will not be passed further
    next();
  } catch (error) {
    // Handle any errors that occur during token verification
    if (error.name === 'TokenExpiredError') {
      // Token has expired
      return next(new AppError('Token has expired, please log in again', 401));
    }

    // For other errors, you might want to log the error and send a generic unauthorized message
    console.error('Error during token verification:', error);
    return next(new AppError('Unauthorized, please login to continue', 401));
  }
};


export const authorizeRoles = (...roles) => async (req, res, next) => {
    const {token} = req.cookies
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decoded
  const currentUserRole = req.user.role;
  if (!roles.includes(currentUserRole)) {
    res.status(401).json({
      success: false,
      msg: 'You are not authorized to perform this action'
    });
  } else {
    next();
  }
};

export const authorizeSubscribers = async (req, _res, next) => {
  // If user is not admin or does not have an active subscription then error else pass
  if (req.user.role !== "ADMIN" && req.user.subscription.status !== "active") {
    return next(new AppError("Please subscribe to access this route.", 403));
  }

  next();
};

export default isLoggedIn;
