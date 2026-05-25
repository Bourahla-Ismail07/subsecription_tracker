import Subscription from "../models/subscriptions.model.js";
import { workflowClient } from "../config/upstash.js";
import { SERVER_URL } from "../config/env.js";
import { success } from "zod";

// create user controller 
export const createSubscription = async (req, res, next) => {
    try {
        // get the subscription infos from the request url
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id
        });
        // the workflow trigger : (start)
        const { workflowRunId } = await workflowClient.trigger({
            url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
            body: {
                subscriptionId: subscription.id,
            },
            headers: {
                'Content-Type': 'application/json',
            },
            retries: 0,
        }
        );
        // POST response
        res.status(201).json({ success: true, data: { subscription, workflowRunId } });
    } catch (error) {
        next(error);
    }
};
// get all user subscriptions controllers
export const getUserSubscriptions = async (req, res, next) => {
    try {
        // get the subscription id and the user id from the url
        const id = req.params.id;
        const user_id = req.user._id;
        // check if the user is authenticated and authorized
        if (user_id !== id) {
            const error = new Error('You are not the owner of this account.');
            error.status = 401;
            throw error;
        }
        // find the subscriptions related to the user via his id
        const subscriptions = await Subscription.find({ user: req.params.id });
        // check if the user have subscription
        if (!subscriptions) {
            const error = new Error('This user do not have any subscriptions.');
            error.status = 404;
            throw error;
        }

        // POST response
        res.status(200).json({ success: true, data: subscriptions })
    } catch (error) {
        next(error);
    }
};
// get user by id controller 
export const getSubscriptions = async (req, res, next) => {
    try {
        // get all of the subscipritons from the DB
        const subscriptions = await Subscription.find();
        //  check if there are subscriptions
        if (!subscriptions) {
            const error = new Error('There is no subscriptions');
            error.status = 404;
            throw error;
        }
        // the GET subscriptions response
        res.status(200).json({ success: true, data: subscriptions })

    } catch (error) {
        next(error);
    }
};
// get subscription by id controller
export const getSubscriptionById = async (req, res, next) => {
    try {
        // get the subscription id from the url and find the user by id
        const id = req.params.id;
        const subscription = await Subscription.findById(id);

        // check if subscription exist
        if (!subscription) {
            const error = new Error('Subscription not found');
            error.status = 404;
            throw error;
        }

        // GET subscription response
        res.status(200).json({ success: true, data: subscription })
    } catch (error) {
        next(error);
    }
};
// update subscription by id controller 
export const updateSubscription = async (req, res, next) => {
    try {
        const id = req.params.id;
        const subscription = await Subscription.findByIdAndUpdate(id, {
            ...req.body,
            // need a user object here
        }
        );
        // check if the subscription exist
        if (!subscription) {
            const error = new Error('Subscription not found');
            error.status = 404;
            throw error;
        }

    } catch (error) {
        next(error);
    }
};
// delete subscription by id controller 
export const deleteSubscription = async (req, res, next) => {
    try {
        const id = req.params.id;
        const subscription = await Subscription.findByIdAndDelete(id);

        if (!subscription) {
            const error = new Error('Subscription not found');
            error.status = 404;
            throw error;
        }

        res.status(200).json({ success: true, data: subscription })

    } catch (error) {
        next(error);
    }
};
// cancel subscription by id controller 
export const cancelSubscription = async (req, res, next) => {
    try {
        // logic
        // check if the subscription exist 
        const id = req.params.id;
        const subscription = await Subscription.findById(id);
        // get the id of the subscription from the request url
        if (!subscription) {
            const error = new Error('Subscription not found');
            error.status = 404;
            throw error;
        }
        // update the status 
        subscription.status = 'canceled';
        // save the changes 
        subscription.save();
        // PUT response 
        res.status(204).json({ success: true, message: subscription });
    } catch (error) {
        next(error);
    }
};
// get upcoming renewals controller
export const getUpcomingRenewals = async (req, res, next) => {
    try {
        // current date
        const today = new Date();
        // date after 7 days
        const next7Days = new Date();
        next7Days.setDate(today.getDate() + 7);
        // find subscriptions renewing within next 7 days
        const subscriptions = await Subscription.find({
            renewalDate: {
                $gte: today,
                $lte: next7Days,
            },
            status: 'active',
        });
        // check if subscriptions exist
        if (!subscriptions || subscriptions.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No upcoming renewals found.',
            });
        }
        // success response
        res.status(200).json({
            success: true,
            count: subscriptions.length,
            data: subscriptions,
        });

    } catch (error) {
        next(error);
    }
};