import { Router } from 'express';
import {
  getRazorpayApiKey,
  buySubscription,
  verifySubscription,
  cancelSubscription,
  allPayments,
} from '../controller/payment.controller.js';
import {
  authorizeRoles,
  authorizeSubscribers,
  isLoggedIn,
} from '../middlewares/auth.middleware.js';

const Paymentrouter = Router();

Paymentrouter.route('/subscribe').post(isLoggedIn, buySubscription);
Paymentrouter.route('/verify').post(isLoggedIn, verifySubscription);
Paymentrouter
  .route('/unsubscribe')
  .post(isLoggedIn, authorizeSubscribers, cancelSubscription);
Paymentrouter.route('/razorpay-key').get(isLoggedIn, getRazorpayApiKey);
Paymentrouter.route('/').get(isLoggedIn, authorizeRoles('ADMIN'), allPayments);

export default Paymentrouter;
