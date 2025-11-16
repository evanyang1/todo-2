const nodemailer = require("nodemailer");

// 1. Configure the transporter using environment variables
//    Make sure to add EMAIL_SERVICE, EMAIL_USER, and EMAIL_PASS to your .env file
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE, // e.g., 'gmail'
  auth: {
    user: process.env.EMAIL_USER, // your email address
    pass: process.env.EMAIL_PASS, // your email password or app-specific password
  },
});

/**
 * Sends a due date reminder email to a user.
 * @param {string} userEmail - The recipient's email address.
 * @param {object} task - The task object.
 */
const sendDueDateReminderEmail = async (userEmail, task) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: `Reminder: Task "${task.title}" is due soon!`,
    html: `
      <h1>Task Reminder</h1>
      <p>Hello,</p>
      <p>This is a reminder that your task, <strong>"${task.title}"</strong>, is due on <strong>${new Date(task.dueDate).toLocaleDateString()}</strong>.</p>
      <p>Don't forget to complete it!</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendDueDateReminderEmail };
