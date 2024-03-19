import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const sendEmail = ({ sender, subject, text, html }) => {
  return new Promise((resolve, reject) => {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    // Message object
    let messageObject = {
      from: "haolovelyjiang@gmail.com",
      to: sender,
      subject: subject,
      text: text,
      html: html,
    };
    transporter.sendMail(messageObject, (err, info) => {
      if (err) {
        return reject({ message: "Error occurred. " + err.message });
      }
      return resolve({ message: "message has been sent successfully!" });
    });
  });
};

export const contactController = async (req, res) => {
  try {
    const response = await sendEmail();
    res.status(201).json(response);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

export const sendContactController = async (req, res, next) => {
  try {
    const response = await sendEmail(req.body);
    res.send(response);
  } catch (err) {
    next(err);
  }
};
