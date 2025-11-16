const cron = require("node-cron");
const taskModel = require("../models/taskModel");
const userModel = require("../models/userModel");
const { sendDueDateReminderEmail } = require("../services/emailService");

/**
 * Finds tasks due within the next 24 hours and sends reminder emails.
 */
const checkDueDatesAndSendReminders = async () => {
  console.log("Running scheduled job: Checking for tasks with upcoming due dates...");

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  try {
    // Find tasks due between now and 24 hours from now, that are not completed
    const upcomingTasks = await taskModel.find({
      dueDate: { $gte: today, $lte: tomorrow },
      status: { $ne: "completed" },
    });

    if (upcomingTasks.length === 0) {
      console.log("No upcoming tasks found.");
      return;
    }

    console.log(`Found ${upcomingTasks.length} upcoming task(s).`);

    for (const task of upcomingTasks) {
      // Find the user who owns the task
      const user = await userModel.findOne({ tasks: task._id });
      if (user) {
        await sendDueDateReminderEmail(user.email, task);
        console.log(`Reminder sent to ${user.email} for task "${task.title}".`);
      }
    }
  } catch (error) {
    console.error("Error in scheduled task:", error);
  }
};

// Schedule the job to run every day at 9:00 AM
const startTaskNotifier = () => {
  cron.schedule("0 9 * * *", checkDueDatesAndSendReminders);
};

module.exports = { startTaskNotifier };
