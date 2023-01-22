const {UserModel} = require('./user.model');
const {PostModel} = require('./post.model');
const {TagModel} = require('./tag.model');
const {PostTagModel} = require('./posttag.model')
const {CommentModel} = require('./comment.model');

// User - Post O:M relationship
UserModel.hasMany(PostModel)
PostModel.belongsTo(UserModel)

// User - Comment O:M relationship
UserModel.hasMany(CommentModel);
CommentModel.belongsTo(UserModel);

// Post - Comment O:M relationship
PostModel.hasMany(CommentModel);
CommentModel.belongsTo(PostModel);

// Post - Tag M:N relationship
PostModel.belongsToMany(TagModel, {through: PostTagModel});
TagModel.belongsToMany(PostModel, {through: PostTagModel});

module.exports = {
    UserModel,
    PostModel,
    TagModel,
    PostTagModel,
    CommentModel
}