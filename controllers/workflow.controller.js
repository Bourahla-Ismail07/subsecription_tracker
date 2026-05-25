import { createRequire } from 'module';
import dayjs from 'dayjs';
import Subscription from "../models/subscriptions.model.js";
import {sendReminderEmail} from "../utils/send-email.js";

// require serve from upstash
const require = createRequire(import.meta.url);
const { serve } = require('@upstash/workflow/express');

// reminders span
const REMINDERS = [7, 5, 2, 1];

// send reminders depending on the trigger function
export const sendReminders = serve(async (context) => {
    const { subscriptionId } = context.requestPayload;
    const subscription = await fetchSubscription(context,subscriptionId);
    // check if the subscription if exist and active
    if (!subscription || subscription.staus !== 'active') return;

    const renewalDate = dayjs(Subscription.rewalDate);
    // check if the renewal date passed
    if (renewalDate.isBefore(dayjs())) {
        console.log(`Renewal date has passed for subscription ${subscriptionId}. Stopping workflow.`);
        return;
    }

    // process each configured reminder date
    for (const daysBefore of REMINDERS) {
        const reminderDate = renewalDate.subtract(daysBefore,'day');
        // wait until the reminder date
        if (reminderDate.isAfter(dayjs())) {
            await sleepUntilReminder(context,`Reminder ${daysBefore} days before.`,reminderDate);
        }
        // send reminder on the scheduled day
        if (dayjs().isSame(reminderDate , 'day')) {
            await triggerReminder(context,`${daysBefore} days before reminder.`,subscription);
        }
    }
});

// get the subscription data from the database for a user
const fetchSubscription = async (context, subscriptionId) => {
    return await context.run('get subscription', async () => {
        return Subscription.findById(subscriptionId).populate('user','name email');
    });
};

// sleep after the workflow is triggered till the date/span is reached
const sleepUntilReminder = async (context, label, date) => {
  console.log(`Sleeping until ${label} reminder at ${date}`);
  await context.sleepUntil(label, date.toDate());
};

// trigger the reminder / workflow depending on the span (exit sleep)
const triggerReminder = async (context,label,subscription) => {
    return await context.run(label, async () => {
        console.log(`Triggering ${label} reminder`);
        // send reminders as emails using nodemailer
        await sendReminderEmail(
            {
                to : subscription.user.email,
                type : label,
                subscription,
            }
        )
    });
};