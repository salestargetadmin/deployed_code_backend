const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const User = sequelize.define("User", {
    email: { type: DataTypes.STRING, allowNull: false ,unique: true}, 
    password: { type: DataTypes.STRING, allowNull: false },
    role: {
        type: DataTypes.ENUM("admin", "user"),
        defaultValue: "user",
      },});

module.exports = User;
