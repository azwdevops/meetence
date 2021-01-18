import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "GMAIL",
  auth: {
    user: process.env.EMAIL_HOST_USER,
    pass: process.env.EMAIL_HOST_PASSWORD,
  },
});

export const ActivationEmail = (email, username, url) => {
  return {
    to: email,
    subject: "Activate your account",
    html: `
    <p>Hi ${username},</p>
    <br>
    <p>Welcome to ${process.env.DOMAIN_NAME},</p>
    <br>
    <p>To activate your account, click on the button below.</p>
    <br>
    <button><a href=${url}>Activate</a></button>
    <br>
    <br>
    <p>Thanks</p>
    <h6>${process.env.DOMAIN_NAME} team.</h6>
    `,
  };
};

export default { transporter, ActivationEmail };
