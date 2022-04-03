const sgMail = require('@sendgrid/mail');
require('dotenv').config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = async function (to, subject, text) {
  const msg = {
    to,
    from: process.env.MAIL_FROM,
    subject,
    text,
  };

  try {
    await sgMail.send(msg);
  } catch (e) {
    console.error(e);
  }
};
