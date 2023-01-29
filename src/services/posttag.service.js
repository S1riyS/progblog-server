const {PostTagModel} = require('../models')

class PostTagService {
    async bulkCreate(tags) {
        await PostTagModel.bulkCreate(tags)
            .catch((error) => {
                console.log(error);
                throw new Error('Something went wrong');
            });
    }

    async delete(postId) {
        await PostTagModel
            .destroy({where: {PostId: postId}})
            .then(() => ({status: true, message: 'PostTag Removed'}))
            .catch((error) => {
                console.log(error);
                throw new Error('PostTag Delete Operation Failed');
            });
    }
}

module.exports = new PostTagService()