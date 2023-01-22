const {DataTypes} = require('sequelize');
const sequelize = require('../config/db.config')

module.exports = () => {
    sequelize.define('Post', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        banner: {
            type: DataTypes.STRING,
        },
        title: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        content: {
            allowNull: false,
            type: DataTypes.TEXT,
        },
        views: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
    }, {
        timestamps: true,
        createdAt: true,
        updatedAt: false
    });
};