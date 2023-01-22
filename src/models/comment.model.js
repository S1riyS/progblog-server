const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Comment', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        text: {
            type: DataTypes.TEXT,
        },
    }, {
        timestamps: true,
        createdAt: true,
        updatedAt: false
    });
};