import { createWelcomeEmailTemplate } from './emailTemplate.js';
import { resendClient,senderObject } from '../lib/resend.js';

export async function sendWelcomeEmail(email,name,clientURL) {
  const { data, error } = await resendClient.emails.send({
    from: `${senderObject.name} <${senderObject.email}>`,
    to: email,
    subject: 'Welcome to Chatify!',
    html: createWelcomeEmailTemplate(name,clientURL),
  });

  if (error) {
    return console.error({ error });
  }

  console.log("Welcome data",{ data });
};