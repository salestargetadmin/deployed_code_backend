const express = require("express");
const router = express.Router();
const axios=require('axios');
const jwt = require('jsonwebtoken');

const Token = require('../models/Token'); // Adjust the path if the location is different


const oAuth2Client=require('../utility/oathclient')

function generateDynamicId() {
  const timestamp = Date.now();
  const randomNum = Math.floor(Math.random() * 1000);
  return `dynamic-id-${timestamp}-${randomNum}`;
}
// Reusable function to fetch user information using access token
const getUserInfo = async (accessToken) => {
  const response = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.data;
};

// Reusable function to verify token
const verifyToken = async (accessToken) => {
  if (!accessToken) {
    throw new Error("Access token is not defined");
  }

  try {
    const response = await axios.get(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`);
    return response.data;  // Return the response data if the token is valid
  } catch (error) {
    throw new Error(error.response ? error.response.data : "An unexpected error occurred");
  }
};

router.get("/verify-token", async (req, res) => {
  try {
    const accessToken = req.accessToken; // Assuming you get the access token from environment variables
    const tokenData = await verifyToken(accessToken); // Call the reusable function
    res.status(200).json({ success: true, data: tokenData });
    console.log(tokenData); // Optionally log the data
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

// Step 1: Generate the Google Authentication URL
router.get('/url', (req, res) => {
    try{
      let userId = req.query.userId;
      if(!userId){
      userId=generateDynamicId();

      // Clear any previously set credentials to force a new login
      oAuth2Client.setCredentials(null);
}
      let authObj={
        access_type: "offline", // Ensures refresh token is returned
        scope: ["https://mail.google.com/",'email'], // Full Gmail access scope
        state:userId
      };
console.log(authObj);
console.log(userId);
const authUrl = oAuth2Client.generateAuthUrl(authObj);
console.log(authUrl);
    res.json({ url: authUrl });
} catch (error) {
  console.log(error);
    res.status(500).json({ error: "Failed to load url" });
  }
  });
  
 // Step 2: Handle the Callback and Save Tokens
router.get("/callback", async (req, res) => {
  const code = req.query.code;
  const userId = req.query.state; // `state` carries the userId

  if (!code || !userId) return res.status(400).json({ error: "Missing authorization code or userId" });

  try {
    const { tokens: newTokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(newTokens);

    // Fetch user information using the new access token
    const userInfo = await getUserInfo(newTokens.access_token);
    // const userEmail = userInfo.email;
    const userEmail = newTokens.id_token ? jwt.decode(newTokens.id_token).email : null;

    // Check if a token already exists for this email
    const existingToken = await Token.findOne({ where: { userEmail } });

    if (existingToken) {
      // Update existing tokens
      await existingToken.update({
        userId,
        accessToken: newTokens.access_token,
        refreshToken: newTokens.refresh_token || existingToken.refreshToken, // Keep existing refreshToken if not returned
      });
      console.log('Token updated for userEmail:', userEmail);
    } else {
      // Create a new token entry
      await Token.create({
        userId,
        userEmail,
        accessToken: newTokens.access_token,
        // refreshToken: newTokens.refresh_token,
        refreshToken:newTokens.refresh_token,
      });
      console.log('Token created for new userEmail:', userEmail);
    }

    res.redirect(`${process.env.FRONTEND_URL}?status=success`); // Redirect back to frontend
  } catch (error) {
    console.error("Failed to fetch tokens or user info:", error);
    res.redirect(`${process.env.FRONTEND_URL}?status=error`);
  }
});
  // Get all tokens with userId and status
// Fetch all tokens and verify them
router.get("/tokens", async (req, res) => {
  try {
    const tokens = await Token.findAll();  // Fetch all tokens from the database

    // Verify each token's access token
    const verifiedTokens = await Promise.all(tokens.map(async (token) => {
      try {
        const tokenData = await verifyToken(token.accessToken);  // Verify the token
        return { ...token.toJSON(), isValid: true, tokenData };  // Add validity and token data to the response
      } catch (error) {
        // In case of an error, mark the token as invalid
        return { ...token.toJSON(), isValid: false, error: error.message };
      }
    }));

    res.json(verifiedTokens);  // Send the tokens with validity status
  } catch (error) {
    console.error("Error fetching tokens:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
  module.exports = router;
