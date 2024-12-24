const express = require("express");
const router = express.Router();
const multer = require("multer");
const csvParser = require("csv-parser");
const { authenticate, authorize } = require("../utility/authorization");
const EmailData = require("../models/EmailData");
const EmailTracking = require("../models/EmailTracking");

const warmupEmails = require("../utility/warmupEmails");
const sendColdEmails = require("../utility/sendColdEmails");
const generateEmail = require("../utility/generateEmail");

// Configure multer for file uploads
// const upload = multer({ dest: "uploads/" });

// Route for CSV email upload
// router.post("/upload-csv",  authenticate, authorize(["admin"]),upload.single("file"), async (req, res) => {
//   const filePath = req.file.path;
//   const results = [];
//   const errors = [];

//   const fs = require("fs");
//   fs.createReadStream(filePath)
//     .pipe(csvParser())
//     .on("data", (row) => {
//       const { Email, "First name": firstName, "Last name": lastName, Department: department, Designation: designation } = row;

//       // Validate required field (Email)
//       if (!Email) {
//         errors.push({ row, message: "Email is required" });
//       } else {
//         results.push({ email: Email, firstName, lastName, department, designation });
//       }
//     })
//     .on("end", async () => {
//       try {
//         if (errors.length > 0) {
//           return res.status(400).json({ errors, message: "Validation errors in the uploaded file" });
//         }
//         // Save valid records to the database
//         await EmailData.bulkCreate(results);
//         res.status(200).json({ message: "File uploaded and processed successfully", totalRecords: results.length });
//       } catch (error) {
//         console.error("Error saving records:", error.message);
//         res.status(500).json({ message: "Error saving records", error: error.message });
//       }
//     });
// });

// GET all emails
router.get("/email-list", authenticate, authorize(["admin"]),async (req, res) => {
  try {
    const emails = await EmailData.findAll();
    res.json(emails);
  } catch (err) {
    res.status(500).json({ message: "Error fetching emails", error: err.message });
  }
});
// Endpoint to fetch only published emails
router.get("/users-email-list", async (req, res) => {
  try {
    const publishedEmails = await EmailData.findAll({ where: { status: "published" } });
    res.status(200).json(publishedEmails);
  } catch (error) {
    res.status(500).json({ message: "Error fetching published emails", error: error.message });
  }
});
// Endpoint to update the status of selected emails
router.put("/update-status",authenticate, async (req, res) => {
  const { ids, status } = req.body; // ids: [1, 2, 3], status: "published" or "draft"

  try {
    await EmailData.update({ status }, { where: { id: ids } });
    res.status(200).json({ message: "Email statuses updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating email statuses", error: error.message });
  }
});

// Endpoint to delete selected emails
router.delete("/delete", authenticate,async (req, res) => {
  const { ids } = req.body; // ids: [1, 2, 3]

  try {
    await EmailData.destroy({ where: { id: ids } });
    res.status(200).json({ message: "Emails deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting emails", error: error.message });
  }
});


// Route to generate a random email
router.get('/generate',authenticate, (req, res) => {
  try {
    const emailTemplate = generateEmail();
    res.status(200).json({ success: true, email: emailTemplate });
  } catch (error) {
    console.error('Error generating email:', error.message);
    res.status(500).json({ success: false, message: 'Error generating email' });
  }
});

// Warm-up route
router.post("/warmup",authenticate, async (req, res) => {
  const { emails, intervalMinutes = 1, frequency = 3 } = req.body;

  console.log("Emails:", emails, "Interval Minutes:", intervalMinutes, "Frequency:", frequency);

  if (!emails || !Array.isArray(emails) || emails.length === 0) {
    return res.status(400).send("Invalid email list.");
  }

  if (frequency <= 0) {
    return res.status(400).send("Frequency must be greater than 0.");
  }

  try {
    warmupEmails(emails, intervalMinutes, frequency);
    res
      .status(200)
      .send(
        `Warm-up process started for ${emails.length} ${
          emails.length > 1 ? "emails" : "email"
        }, each email will be sent ${frequency} ${frequency > 1 ? "times" : "time"}.`
      );
  } catch (error) {
    console.error("Error during warm-up process:", error.message);
    res.status(500).send(`Error during warm-up: ${error.message}`);
  }
});

// Cold email route
router.post("/send-cold-emails", authenticate,async (req, res) => {
    const { emails } = req.body;
    let emailBody=generateEmail();
    if (!emails || !Array.isArray(emails) || emails.length === 0) {
      return res.status(400).send("Invalid email list.");
    }
    try {
      await sendColdEmails(emails, emailBody);
      res.status(200).send(`Cold emails sent to ${emails.length} recipients.`);
    } catch (error) {
      res.status(500).send(`Error during cold email sending: ${error.message}`);
    }
  });
  router.get('/track-pixel', async (req, res) => {
    const { email, campaign,usermail } = req.query;
    const decodedCampaign = decodeURIComponent(campaign);

    if (!email || !campaign) {
      return res.status(400).send('Missing required parameters.');
    }
  
    try {
      // Log email open
      await EmailTracking.create({
        campaignName: decodedCampaign,
        email,
        username:usermail,
        type: 'open',
        timestamp: new Date(),

      });
  
      console.log(`Email opened by ${email} for campaign ${campaign}`);
  
      // Respond with a 1x1 transparent pixel
      const pixelBuffer = Buffer.from(
        'R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
        'base64'
      );
      res.setHeader('Content-Type', 'image/gif');
      res.send(pixelBuffer);
    } catch (err) {
      console.error('Error logging email open:', err);
      res.status(500).send('Failed to log email open.');
    }
  });
  router.get('/track-link', async (req, res) => {
    const { email, campaign, usermail,redirectUrl } = req.query;
    const decodedCampaign = decodeURIComponent(campaign);
  console.log( email, campaign, usermail,redirectUrl);

    if (!email || !campaign || !redirectUrl) {
      return res.status(400).send('Missing required parameters.');
    }

    try {
      // Log link click
      await EmailTracking.create({
        campaignName: decodedCampaign,
        email,
        username:usermail,
        type: 'click',
        timestamp: new Date(),
      });
  
      console.log(`Link clicked by ${email} for campaign ${campaign}`);
  
      // Redirect to the final destination
      res.redirect(redirectUrl);
    } catch (err) {
      console.error('Error logging link click:', err);
      res.status(500).send('Failed to log link click.');
    }
  });
  router.get('/tracking-data', async (req, res) => {
    try {
      const trackingData = await EmailTracking.findAll();
      res.json(trackingData);
    } catch (err) {
      console.error('Error fetching tracking data:', err);
      res.status(500).send('Failed to fetch tracking data.');
    }
  });
module.exports = router;
