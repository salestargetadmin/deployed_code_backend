const e = require("cors");
const { authenticate } = require("../utility/authorization");
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET_KEY ;

module.exports = (sequelize) => {
  const express = require("express");
  const router = express.Router();
  const Campaign = sequelize.models.Campaign;
  const sendColdEmails = require("../utility/sendColdEmails");
  const generateEmail = require("../utility/generateEmail");


  // Create a new campaign
  router.post("/create", authenticate,async (req, res) => {
    const { name, targetAudience, emailTemplate, emails, status = "draft", interval, frequency } = req.body;

    if (!emails || !emails.length) {
      return res.status(400).json({ error: "At least one email is required." });
    }

    try {
      const campaign = await Campaign.create({
        name,
        targetAudience,
        emailTemplate,
        emails,
        status,interval,frequency
      });

      res.status(201).json({
        message: "Campaign created successfully",
        campaign,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Fetch all campaigns
  router.get("/all", authenticate,async (req, res) => {
    try {
      const campaigns = await Campaign.findAll();
      res.status(200).json(campaigns);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  router.put("/:campaignId/update", authenticate,async (req, res) => {
    const { campaignId } = req.params;
    const { name, targetAudience, emailTemplate, emails, interval, frequency } = req.body;
  
    try {
      const campaign = await Campaign.findByPk(campaignId);
      if (!campaign) {
        return res.status(404).send("Campaign not found.");
      }
  
      await campaign.update({
        name,
        targetAudience,
        emailTemplate,
        emails,
        interval,
        frequency,
      });
  
      res.status(200).json({ message: "Campaign updated successfully", campaign });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  
  // Start a campaign with emails
router.post("/:campaignId/start", authenticate, async (req, res) => {
  
   const token = req.headers.authorization?.split(" ")[1];
      const decoded = jwt.verify(token, JWT_SECRET);
      const userEmail = decoded.email;

      console.log("Email:", userEmail);  // Output: Email: user@example.com (assuming email is in the payload)
  const { campaignId} = req.params;
  const { initiator} = req.body;
  try {
    // Fetch the campaign details from the database
    const campaign = await Campaign.findByPk(campaignId);
    
    if (!campaign) {
      return res.status(404).send("Campaign not found.");
    }

// console.log(campaign);
    // // Retrieve required data from the campaign object
    // const { interval, frequency, emailList } = campaign;

    // // If emailList is stored as a stringified array in the database, parse it
    // const emails = campaign.emails ? JSON.parse(campaign.emails) : [];
    // if (!emails.length) {
    //   return res.status(400).send("No emails associated with this campaign.");
    // }

    // Generate the email body dynamically
    let emailBody = generateEmail();
    let emailObj = {
      subject: `Campaign: ${campaign.name}`,
      body: emailBody,
      campaignName:campaign.name,
      userEmail:userEmail
    };

    // Send the emails using the campaign's interval and frequency
    // await sendColdEmails(emails, emailObj, interval, frequency);
    await sendColdEmails(campaign.emails, emailObj, campaign.interval, campaign.frequency,initiator, req);

    res.status(200).send(`Cold email campaign "${campaign.name}" started.`);
  } catch (error) {
    res.status(500).send(`Error starting campaign: ${error.message}`);
  }
});

module.exports = router;


  return router;
};
