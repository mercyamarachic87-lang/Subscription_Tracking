// email_template.js

export const emailTemplates = [
    {
        label: 'subscriptionReminder',
        generateSubject: (info) => `Upcoming Billing Reminder - ${info.subscriptionName}`,
        generateBody: (info) => '...',
    subscriptionCreated: (serviceName, amount, date) => `
    <h2>Subscription Created</h2>
    <p>You have successfully added a new subscription.</p>
    <p><strong>Service:</strong> ${serviceName}</p>
    <p><strong>Amount:</strong> ₦${amount}</p>
    <p><strong>Next Billing Date:</strong> ${date}</p>
  `,

    subscriptionReminder: (serviceName, amount, date) => `
    <h2>Upcoming Billing Reminder</h2>
    <p>This is a reminder that an upcoming payment is due soon.</p>
    <p><strong>Service:</strong> ${serviceName}</p>
    <p><strong>Amount:</strong> ₦${amount}</p>
    <p><strong>Billing Date:</strong> ${date}</p>
  `,

    subscriptionExpired: (serviceName, date) => `
    <h2>Subscription Expired</h2>
    <p>Your subscription has expired.</p>
    <p><strong>Service:</strong> ${serviceName}</p>
    <p><strong>Expired On:</strong> ${date}</p>
  `,

    generalNotification: (title, message) => `
    <h2>${title}</h2>
    <p>${message}</p>
  `
},
]