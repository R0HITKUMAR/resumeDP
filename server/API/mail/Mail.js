import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import path from "path";

var transporter = nodemailer.createTransport({
  host: "smtp.office365.com",
  secureConnection: false,
  port: 587,
  tls: {
    ciphers: "SSLv3",
  },
  auth: {
    user: "ResumeDP@outlook.com",
    pass: "14de4477a1b64e9e8c76103eb09e50891",
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
    from: "ResumeDP <ResumeDP@outlook.com>",
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
    from: "ResumeDP <ResumeDP@outlook.com>",
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
