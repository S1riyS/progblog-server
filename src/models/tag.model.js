const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
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