import  {emailTemplates} from "./email-template.js";
import dayjs from "dayjs";
import {EMAIL_USER} from "../config/env.js";
import transporter from "../config/nodemailer.js";

export const sendReminderEmail = async ({to , type, subscription}) => {
    // email params check
    if (!to || !type) throw Error('Missing required parameters');
    // find the template
    const template = emailTemplates.find((t) => t.label === type);
    // check if the templates
    if (!template) throw Error('Invalid email type');
    //  email infos
    const mailInfo =  {
        username: subscription.user.name,
        subscriptionName : subscription.name,
        renewalDate : dayjs(subscription.renwalDate).format('MMM D, YYYY'),
        planName : subscription.name,
        price : `${subscription.currency} ${subscription.price} (${subscription.frequency})`,
        paymentMethod: subscription.paymentMethod,
    };
    // email message and subject
    const message = template.generateBody(mailInfo);
    const subject = template.generateSubject(mailInfo);
    // email options (sender,sent to,,content)
    const mailOptions = {
      from : EMAIL_USER,
      to : to,
      subject: subject,
      html : message,
    };
    // send the email using the nodemailer transporter
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) return console.log(error , 'Error sending email');
        console.log('Email sent: ' + info.response);
    });
}