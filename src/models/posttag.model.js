const {DataTypes} = require('sequelize');
const {PostModel} = require('./post.model')
const {TagModel} = require('./tag.model')
const sequelize = require('../config/db.config')

const PostTagModel = sequelize.define('PostTag', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    PostId: {
        type: DataTypes.INTEGER,
        references: {
            model: PostModel,
            key: 'id'
        }
    },
    TagId: {
        type: DataTypes.INTEGER,
        references: {
            model: TagModel,
            key: 'id'
        }
    },
}, {
    timestamps: false,
});

module.exports = {PostTagModel};