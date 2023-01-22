const {DataTypes} = require('sequelize');
const sequelize = require('../config/db.config')

module.exports = () => {
    sequelize.define('Tag', {
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
    }, {
        timestamps: false,
    });
};