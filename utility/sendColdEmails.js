const schedule = require("node-schedule");
const createTransporter = require("./transporter.js");
const generateEmail = require("./generateEmail");

const nodemailer = require('nodemailer'); // Ensure nodemailer is imported

const sendColdEmails = async (emails, emailObj, intervalMinutes, frequency, initiator) => {
  try {
    // Track how many emails have been sent to each recipient
    const emailSendCounts = new Array(emails.length).fill(0);
     frequency=1;
    // Initialize the scheduler
    // const job = schedule.scheduleJob(`*/${intervalMinutes} * * * *`, async () => {
      const job = async () => {
      console.log(`Cold email scheduler triggered at ${new Date()}`);

      let allEmailsSent = true; // Flag to track if all emails have been sent

      for (let i = 0; i < emails.length; i++) {
        if (emailSendCounts[i] < frequency) {
          const recipientEmail = emails[i];

          for (const account of initiator) {
            try {
              const encodedCampaignName = encodeURIComponent(emailObj.campaignName);

              const trackingPixelUrl = `https://gwkz7gji8j.execute-api.us-east-1.amazonaws.com/emails/track-pixel?email=${encodeURIComponent(recipientEmail)}&usermail=${emailObj.userEmail}&campaign=${encodedCampaignName}`;
const trackingLinkUrl = `https://gwkz7gji8j.execute-api.us-east-1.amazonaws.com/emails/track-link?email=${encodeURIComponent(recipientEmail)}&usermail=${emailObj.userEmail}&campaign=${encodedCampaignName}&redirectUrl=${encodeURIComponent('https://gwkz7gji8j.execute-api.us-east-1.amazonaws.com')}`;
console.log(trackingPixelUrl);
console.log(trackingLinkUrl);
              console.log(account);
              console.log(account.hostname,account.email,account.password);
              // Create transporter for the current initiator
              const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465, // Standard SMTP port
                secure: true, // Use TLS
                auth: {
                  user: account.email,
                  pass: account.password,
                },
              });

              // Send email
              await transporter.sendMail({
                from: account.email, // Sender email
                to: recipientEmail,
                subject: emailObj.subject,
                text: `${emailObj.body}\n\nClick here: ${trackingLinkUrl}`, // Plain-text version
                html: `
                  <p>${emailObj.body}</p>
                  <a href="${trackingLinkUrl}">Click here</a>
                  <img src="${trackingPixelUrl}" alt="" style="display:none;" />`, // HTML version
              });

              console.log(
                `Cold email #${emailSendCounts[i] + 1} sent to ${recipientEmail} using ${account.email}`
              );

              // Increment the count for this recipient
              emailSendCounts[i]++;
              allEmailsSent = false; // Emails are still being sent
              break; // Stop trying other initiators for this email
            } catch (error) {
              console.error(
                `Failed to send email to ${recipientEmail} using ${account.email}:`,
                error.message
              );
            }
          }
        }
      }

      // Stop the scheduler if all emails have been sent
      if (allEmailsSent) {
        console.log("Cold email campaign completed.");
        // job.cancel(); // Stop the scheduler
      }
    };
    await job();
  } catch (error) {
    console.error("Error initializing transporter:", error.message);
  }
};


module.exports = sendColdEmails;
