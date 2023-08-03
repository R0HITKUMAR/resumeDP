import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import path from "path";
import config from "../../config.js";

let transporter = nodemailer.createTransport({
  host: config.SMTP_HOST,
  port: config.SMTP_PORT,
  auth: {
    user: config.SMTP_USER,
    pass: config.SMTP_PASS,
  },
});

const handlebarOptions = {
  viewEngine: {
    partialsDir: path.resolve("./API/mail/templates/"),
    defaultLayout: false,
  },
  viewPath: path.resolve("./API/mail/templates/"),
};

transporter.use("compile", hbs(handlebarOptions));

function sendOTPMail(email, otp, reason, sub) {
  var mailOptions = {
    from: "ResumeDP <no-reply.resumedp@hotmail.com>",
    to: email,
    subject: sub,
    template: "otp",
    context: {
      otp: otp,
      title: reason,
    },
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

function sendWelcomeMail(email) {
  var mailOptions = {
    from: "ResumeDP <no-reply.resumedp@hotmail.com>",
    to: email,
    subject: "Welcome to Resumee!",
    template: "welcome",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}
export { sendOTPMail, sendWelcomeMail };
