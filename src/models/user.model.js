const {DataTypes} = require('sequelize');
const sequelize = require('../config/db.config')

module.exports = () => {
    sequelize.define('User', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        email: {
            type: DataTypes.STRING,
            validate: { isEmail: true },
        },
        password: {
            allowNull: false,
            type: DataTypes.STRING
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        avatar: {
            type: DataTypes.STRING,
            allowNull: false
        },
        bio: {
            type: DataTypes.TEXT
        },
    }, {
        timestamps: true,
        createdAt: true,
        updatedAt: false
    });
};