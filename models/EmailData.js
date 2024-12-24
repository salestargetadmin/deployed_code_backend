const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const EmailData = sequelize.define("EmailData", {
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  firstName: { type: DataTypes.STRING },
  lastName: { type: DataTypes.STRING },
  department: { type: DataTypes.STRING },
  designation: { type: DataTypes.STRING },
  status: {
    type: DataTypes.ENUM("draft", "published"),
    defaultValue: "draft",
  },
});

module.exports = EmailData;
