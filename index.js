const express = require("express");
const cors = require("cors");
require('dotenv').config();
const bodyParser = require("body-parser");
const path = require("path");
const bcrypt=require("bcrypt");
const sequelize = require("./database");
const campaignRoutes = require("./routes/campaigns");
const emailRoutes = require("./routes/emails");
const accountsRoutes = require("./routes/accounts");
const oathRoutes = require("./routes/oauth");
const authRoutes = require("./routes/auth");
const generateEmail=require("./utility/generateEmail")
const User = require('./models/User'); // Adjust the path if the location is different
const serverless = require("serverless-http");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/campaigns", campaignRoutes(sequelize)); // Pass sequelize or the correct database instance here
app.use("/emails", emailRoutes);
app.use("/accounts", accountsRoutes);
app.use("/oauth", oathRoutes);
app.use("/auth", authRoutes);


//   app.post("/send-email", (req, res) => {
//     const { emailBody, recipient } = req.body;
//     emailBody=generateEmail();
//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: recipient,
//       subject: "Campaign Email",
//       text: emailBody,
//     };
// //  Dummy response 
// res.status(201).json({
//   message: `Email sent to : ${recipient}`
// });
//     // transporter.sendMail(mailOptions, (error, info) => {
//     //   if (error) {
//     //     return res.status(500).send(error.toString());
//     //   }
//     //   res.status(200).send("Email sent: " + info.response);
//     // });
//   });
  

// Sync database
(async () => {
    await sequelize.sync();
    // await sequelize.sync({ alter: true }); // Sync with alter option to update schema
    console.log(`DB connected`)
  //   // const adminEmail = "admin@domain.com";
  //   // const adminPassword = "admin123"; // Use env vars or a secure mechanism
  //   const adminEmail = "testuser1@domain.com";
  // const adminPassword = "testuser123"; // Use env vars or a secure mechanism

  // const existingAdmin = await User.findOne({ where: { email: adminEmail } });
  // if (!existingAdmin) {
  //   const hashedPassword = await bcrypt.hash(adminPassword, 10);
  //   await User.create({ email: adminEmail, password: hashedPassword, role: "user" });
  //   console.log("User account created");
  // }
})();
app.get("/health", (req, res) => {
  res.status(200).send("Server is running!");
});
// Serve Frontend
app.use(express.static(path.join(__dirname, "public")));
app.get("*", (req, res) => {
  console.log(`Serving index.html for path: ${req.path}`); 
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// module.exports = app;
const PORT = +process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


module.exports.handler = serverless(app);
