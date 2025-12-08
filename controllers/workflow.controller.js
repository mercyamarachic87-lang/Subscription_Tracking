import {createRequire} from 'module';

const require = createRequire(import.meta.url);
const {serve} = require('@upstash/workflow/express');

const REMINDER = [7, 5, 2, 1]


export const sendReminders = serve(async (context) => {
    const { subscriptionId} = context.requestPayload;
    const subscription = await fetchSubscription(context, subscriptionId);

    if(!subscription || subscription.status !== active) return;

    const renewalDate = dayjs(subscription.renewalDate);

    if(renewalDate.isBefore(dayjs())) {
    console.log(`Renewal date has passed for subscription ${subscriptionId}. Stopping workflow`);
    return;
    }

    for (const datsBefore of REMINDERS) {
        const reminderDate = renewalDate.substract(daysBefore, 'days');

        if(reminderDate.isAfter(dayjs())) {
            await sleepUntilReminder(context, `Reminder ${daysBefore} days before`, reminderDate )
        }
        await triggerReminder(context, `Reminder ${daysBefore} days before`);

    }
});

const fetchSubscription = async (context, subscriptionId) => {
  return await context.run( 'get subcription', () => {
  return Subscription.findById(subscription).populate('user', 'name, email');
  };
});

  const sleepUntilReminder = async (context, label, date) => {
      console.log(`Sleeping until ${label} reminder at ${date}`);
      await context.sleepuntil(label, date.toDate());
  }

  const triggerReminder = async (context, label) => {
    return await context.run(label, () => {
        console.log(`Triggering ${label} reminder`);
    })
  }