const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const EmailTracking = sequelize.define('EmailTracking', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    campaignName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false, // Retrieved from token
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('click', 'open'),
      allowNull: false, // Tracks whether it's a link click or email open
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.NOW,
    },
  });

module.exports = EmailTracking;
