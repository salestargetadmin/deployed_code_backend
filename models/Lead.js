const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Lead = sequelize.define("Lead", {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING },
    status: { type: DataTypes.STRING, defaultValue: "New" },
});

module.exports = Lead;
