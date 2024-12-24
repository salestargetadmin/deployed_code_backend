module.exports = (sequelize, DataTypes) => {
  const Campaign = sequelize.define("Campaign", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    targetAudience: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    emailTemplate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "draft",
    },
    emails: {
      type: DataTypes.JSON, // Store emails as a JSON array
      allowNull: false,
    },
    interval: {
      type: DataTypes.INTEGER, // Interval in minutes, hours, or days depending on your logic
      allowNull: false,
      defaultValue: 1, // Default interval (e.g., 1 day)
    },
    frequency: {
      type: DataTypes.INTEGER, 
      allowNull: false,
    },
  });

  return Campaign;
};
