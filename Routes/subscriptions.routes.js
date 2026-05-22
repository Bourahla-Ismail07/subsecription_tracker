import {Router} from 'express';
import authorize from "../middlewares/auth.middleware.js";
import {
    cancelSubscription, createSubscription,
    deleteSubscription, getSubscriptionById,
    getSubscriptions, getUpcomingRenewals,
    getUserSubscription, updateSubscription
} from "../controllers/subscription.controller.js";

const subscriptionsRoutes = Router();
// get all subscription
subscriptionsRoutes.get('/', getSubscriptions);
// get subscriptions by id
subscriptionsRoutes.get('/:id', authorize, getSubscriptionById);
// add new subscription where the user is already exit && logged in
subscriptionsRoutes.post('/', authorize, createSubscription);
// update a subscription
subscriptionsRoutes.put('/:id', updateSubscription);
// delete a subscription
subscriptionsRoutes.delete('/:id', deleteSubscription);
// get all of user subscriptions :
subscriptionsRoutes.get('/user/:id', authorize, getUserSubscription);
// cancel a subscription
subscriptionsRoutes.put('/:id/cancel', cancelSubscription);
// get upcoming renewals
subscriptionsRoutes.get('/upcoming-renewals', getUpcomingRenewals);

export default subscriptionsRoutes;