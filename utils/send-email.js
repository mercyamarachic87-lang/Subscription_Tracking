import { emailTemplates } from './email_template.js';

export const sendReminderEmail = async ({ to, type, subscription}) => {
    if(!to || !type) throw new Error('Missing Parameters Required');

    const template = emailTemplates.find((t) => t.label === type);

    if(!template) throw new Error(' Invalid Email');

    const infomail = {

    }
}