const nodemailer = require('nodemailer');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  const data = JSON.parse(event.body);

  const transporter = nodemailer.createTransport({
    service: 'your-email-service-provider', // e.g., 'Gmail'
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-email-password',
    },
  });

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: 'revilo@live.se',
    subject: `New Contact Form Submission from ${data.name}`,
    text: data.message,
  };

  try {
    await transporter.sendMail(mailOptions);
    return {
      statusCode: 200,
      body: 'Email sent successfully!',
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: 'Email could not be sent. Please try again.',
    };
  }
};
