const {CommentModel} = require('../models')

class PostService {

    async create(newComment) {
        return await CommentModel
            .create({
                text: newComment.text,
                UserId: newComment.userId,
                PostId: newComment.postId,
            })
            .catch((error) => {
                console.log(error)
                throw new Error('Error while creating comment')
            })
    }
}

module.exports = new CommentService()