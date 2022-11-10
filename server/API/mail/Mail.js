import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import path from "path";

let transporter = nodemailer.createTransport({
  host: "smtp.elasticemail.com",
  port: 2525,
  auth: {
    user: "no-reply@aboutrohit.in",
    pass: process.env.SMTP_PASSWORD,
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
    from: "ResumeDP <no-reply@aboutrohit.in>",
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
    from: "ResumeDP <no-reply@aboutrohit.in>",
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
