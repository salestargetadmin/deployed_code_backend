const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Token = sequelize.define("Token", {
    userId: { type: DataTypes.STRING, allowNull: false }, 
    accessToken: { type: DataTypes.STRING, allowNull: false },
    refreshToken: { type: DataTypes.STRING, allowNull: false },
    userEmail: { type: DataTypes.STRING, allowNull: false }, 
});

module.exports = Token;
