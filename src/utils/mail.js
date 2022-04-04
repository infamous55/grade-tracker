const sgMail = require('@sendgrid/mail');
const client = require('@sendgrid/client');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
client.setApiKey(process.env.SENDGRID_API_KEY);

module.exports.send = async function (to, subject, text) {
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

module.exports.verify = async function (email) {
  const data = {
    email: email,
    source: 'verify',
  };

  const request = {
    url: `/v3/validations/email`,
    method: 'POST',
    body: data,
  };

  try {
    const response = await client.request(request);
    return response;
  } catch (e) {
    console.error(e);
  }
};
