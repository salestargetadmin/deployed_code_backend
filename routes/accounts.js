const express = require("express");
const router = express.Router();
const EmailAccount = require("../models/EmailAccount");
const { authenticate, authorize } = require("../utility/authorization");

// GET all email accounts
router.get("/email-list", authenticate, authorize(["admin"]), async (req, res) => {
  try {
    const emails = await EmailAccount.findAll();
    res.json(emails);
  } catch (err) {
    res.status(500).json({ message: "Error fetching email accounts", error: err.message });
  }
});
// Endpoint to delete selected emails
router.delete("/email-list", authenticate, async (req, res) => {
    const { ids } = req.body; // ids: [1, 2, 3]
    
    if (!ids || ids.length === 0) {
      return res.status(400).json({ message: "No ids provided" });
    }
  
    try {
      const deletedCount = await EmailAccount.destroy({
        where: {
          id: ids,
        },
      });
  
      if (deletedCount === 0) {
        return res.status(404).json({ message: "No emails found to delete" });
      }
  
      res.status(200).json({ message: "Emails deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting emails", error: error.message });
    }
  });
  
// Add this in the `router` for `/email-list` endpoint
router.post("/email-list/create", authenticate, authorize(["admin"]), async (req, res) => {
    const { email, password, hostname, smtp, status } = req.body;
  
    try {
      const newEmailAccount = await EmailAccount.create({ email, password, hostname, smtp, status });
      res.status(201).json(newEmailAccount);
    } catch (error) {
      res.status(500).json({ message: "Error creating email account", error: error.message });
    }
  });
  
// GET only published email accounts
router.get("/users-email-list", authenticate, async (req, res) => {
  try {
    const publishedEmails = await EmailAccount.findAll({ where: { status: "published" } });
    res.status(200).json(publishedEmails);
  } catch (error) {
    res.status(500).json({ message: "Error fetching published email accounts", error: error.message });
  }
});

// Update the status of selected email accounts
router.put("/update-status", authenticate,  authorize(["admin"]),async (req, res) => {
  const { ids, status } = req.body;

  try {
    await EmailAccount.update({ status }, { where: { id: ids } });
    res.json({ message: "Email account status updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating status", error: error.message });
  }
});

module.exports = router;
