const {UserModel} = require('./user.model');
const {PostModel} = require('./post.model');
const {TagModel} = require('./tag.model');
const {PostTagModel} = require('./posttag.model')
const {CommentModel} = require('./comment.model');

// User - Post O:M relationship
UserModel.hasMany(PostModel, {
    foreignKey: {name: 'user_id', allowNull: false}
})
PostModel.belongsTo(UserModel)

// User - Comment O:M relationship
UserModel.hasMany(CommentModel, {
    foreignKey: {name: 'user_id', allowNull: false},
});
CommentModel.belongsTo(UserModel);

// Post - Comment O:M relationship
PostModel.hasMany(CommentModel, {
    foreignKey: {name: 'post_id', allowNull: false},
});
CommentModel.belongsTo(PostModel);

// Post - Tag M:N relationship
PostModel.belongsToMany(TagModel, {through: PostTagModel, foreignKey: {name: 'post_id', allowNull: false}});
TagModel.belongsToMany(PostModel, {through: PostTagModel, foreignKey: {name: 'tag_id', allowNull: false}});

module.exports = {
    UserModel,
    PostModel,
    TagModel,
    PostTagModel,
    CommentModel
}