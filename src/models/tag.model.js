const {DataTypes} = require('sequelize');
const sequelize = require('../config/db.config')

const TagModel = sequelize.define('Tag', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    name: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
    },
    description: {
        allowNull: false,
        type: DataTypes.TEXT,
    },
}, {
    timestamps: false,
});

module.exports = {TagModel};