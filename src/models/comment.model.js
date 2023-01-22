const {DataTypes} = require('sequelize');
const sequelize = require('../config/db.config')

const CommentModel = sequelize.define('Comment', {
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

module.exports = {CommentModel};