const schedule = require('node-schedule');
const generateEmail=require('./generateEmail.js')
const transporter=require('./transporter.js')



// Warm-up function
const warmupEmails = async (emails, intervalMinutes, frequency) => {
  let emailIndex = 0; // Tracks the email in the emails array
  let sendCount = 0;  // Tracks how many emails have been sent for the current recipient

  // Dummy recipients
  const dummyRecipients = ["dummy1@example.com", "dummy2@example.com", "dummy3@example.com"];

  // Dummy email content logic
  const generateEmailContent = (emailIndex, sendCount) => {
    return `Warm-up Email #${sendCount + 1} for ${emails[emailIndex]}:\n\n` +
           `This is a dynamic warm-up email with unique content.\n` +
           `Tip of the day: Stay consistent with your email strategy!`;
  };

  const job = schedule.scheduleJob(`*/${intervalMinutes} * * * *`, async () => {
    console.log(`Scheduler triggered at ${new Date()}`);

    if (emailIndex < emails.length) {
      const senderEmail = emails[emailIndex];

      // Email content
      const emailContent = generateEmailContent(emailIndex, sendCount);

      try {
        // Uncomment the line below to enable email sending
        // await transporter.sendMail({
        //   from: senderEmail,
        //   to: dummyRecipients, // Send to multiple recipients
        //   subject: `Warm-up Email #${sendCount + 1}`,
        //   text: generateEmail(),
        // });

        console.log(
          `Warm-up email #${sendCount + 1} sent from ${senderEmail} to ${dummyRecipients.join(", ")}`
        );
      } catch (error) {
        console.error(
          `Failed to send warm-up email from ${senderEmail}:`,
          error.message
        );
      }

      sendCount++;

      // Check if we've reached the frequency limit for this email
      if (sendCount >= frequency) {
        sendCount = 0; // Reset the send count for the next recipient
        emailIndex++;  // Move to the next email in the list
      }
    } else {
      console.log("Warm-up emails completed.");
      job.cancel(); // Stop the scheduler
    }
  });
};

module.exports = warmupEmails;
