import { emailTemplates } from './email_template.js';
import dayjs from "dayjs";
import {transporter} from '../config/nodemailer.js';
import { accountEmail} from "../config/nodemailer.js";

export const sendReminderEmail = async ({ to, type, subscription}) => {
    if(!to || !type) throw new Error('Missing Parameters Required');

    const template = emailTemplates.find((t) => t.label === type);

    if(!template) throw new Error(' Invalid Email');

    const mailInfo = {
        userName: subscription.user.name,
        subscriptionName: subscription.name,
        renewalDate: dayjs(subscription.renewalDate).format('MMM, DDD, YYY'),
        planName: subscription.name,
        price: ` ${subscription.currency} ${subscription.price} (${subscription.frequency}) `,
        paymentMethod: subscription.paymentMethod
    }
    const message = template.generateBody(mailInfo)
    const subject = template.generateSubject(mailInfo)

    const mailOptions = {
        from: accountEmail,
        to: to,
        subject: subject,
        html: message,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
    }catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }

}