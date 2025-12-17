import {createRequire} from 'module';
import dayjs from "dayjs";
import Subscription from "../model/subscription.js";
import {sendReminderEmail} from "../utils/send-email.js";
import subscription from "../model/subscription.js";

const require = createRequire(import.meta.url);
const {serve} = require('@upstash/workflow/express');

const REMINDER = [7, 5, 2, 1]


export const sendReminders = serve(async (context) => {
    const { subscriptionId} = context.requestPayload;
    const subscription = await fetchSubscription(context, subscriptionId);

    if(!subscription || subscription.status !== 'active' ) return;

    const renewalDate = dayjs(subscription.renewalDate);

    if(renewalDate.isBefore(dayjs())) {
    console.log(`Renewal date has passed for subscription ${subscriptionId}. Stopping workflow`);
    return;
    }



    for (const daysBefore of REMINDER) {
        const reminderDate = renewalDate.subtract(daysBefore, 'days');

        if(reminderDate.isAfter(dayjs())) {
            await sleepUntilReminder(context, `Reminder ${daysBefore} days before`, reminderDate )
        }
        await triggerReminder(context, `Reminder ${daysBefore} days before`, subscription);

    }
});

const fetchSubscription = async (context, subscriptionId) => {
  return await context.run( 'get subcription', async () => {
  return Subscription.findById(subscriptionId).populate('user', 'name, email');
  });
};

  const sleepUntilReminder = async (context, label, date) => {
      console.log(`Sleeping until ${label} reminder at ${date}`);
      await context.sleepUntil(label, date.toDate());
  }

  const triggerReminder = async (context, label, subscription) => {
    return await context.run(label, async () => {
        console.log(`Triggering ${label} reminder`);

        await sendReminderEmail({
            to: subscription.user.email,
            type: 'subscriptionReminder',
            subscription: subscription
        })
    })

  }