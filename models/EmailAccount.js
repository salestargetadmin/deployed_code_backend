const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const EmailAccount = sequelize.define("EmailAccount", {
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  hostname: { type: DataTypes.STRING },
  smtp: { type: DataTypes.STRING },
  status: {
    type: DataTypes.ENUM("draft", "published"),
    defaultValue: "draft",
  },
});

module.exports = EmailAccount;
