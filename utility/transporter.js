const nodemailer = require("nodemailer");
const Token = require('../models/Token'); // Adjust the path if the location is different

let mailServiceReady=true;


// let accessToken=process.env.ACCESS_TOKEN,refreshToken=process.env.REFRESH_TOKEN;
// # EMAIL_USER=fu36ug0le479z22@tempmail.us.com
// # EMAIL_PASS=xQfeYCsjVGZ2u0yaUBsrZAoQ8sCu@L
// const authUrl = oAuth2Client.generateAuthUrl({
//   access_type: "offline", // Ensures refresh token is returned
//   scope: ["https://mail.google.com/"], // Full Gmail access scope
// });
// console.log("Authorize this app by visiting:", authUrl);
// async function getTokens(authUrl) {
//   const { tokens } = await oAuth2Client.getToken(authUrl);
//   console.log("Access Token:", tokens.access_token);
//   console.log("Refresh Token:", tokens.refresh_token);
//   oAuth2Client.setCredentials({
//     refresh_token: tokens.refresh_token, // Use the refresh token obtained earlier
//   });
//   mailServiceReady=true;
//   console.log('Email Service is ready now!!!!!');
// }

// getTokens(process.env.AUTH_CODE);
// Create a function to generate and export the transporter
const createTransporter = async () => {
  try {
    if(!mailServiceReady){
      throw Error= 'Mail Service not ready yet'
    }
    const tokens = await Token.findAll(); // Fetch all tokens from the database
let firstEl=tokens[0];
console.log(firstEl.accessToken);
console.log(firstEl.refreshToken);
    // Generate a test account from Nodemailer's testing service
    // const testAccount = await nodemailer.createTestAccount();

    // Create a transporter using the test account details
    const transporter = nodemailer.createTransport({
      // host: testAccount.smtp.host,
      // port: testAccount.smtp.port,
      // secure: testAccount.smtp.secure, // true for 465, false for other ports
      // auth: {
      //   user: testAccount.user, // Generated user
      //   pass: testAccount.pass, // Generated password
      // },
      // service: "gmail",
      // auth: {
      //   user: process.env.EMAIL_USER, // Your Gmail address
      //   pass: process.env.EMAIL_PASS, // App Password
      // },
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL_USER,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: firstEl.refreshToken,
        accessToken: firstEl.accessToken,
      },
    });

    // console.log("Test email account created:");
    // console.log(`User: ${testAccount.user}`);
    // console.log(`Pass: ${testAccount.pass}`);

    // return { transporter, senderEmail: testAccount.user };
    return transporter
    } catch (error) {
    console.error("Error creating the transporter:", error);
    throw error;
  }
};

// Export the function to use in other parts of your app
module.exports = createTransporter;
