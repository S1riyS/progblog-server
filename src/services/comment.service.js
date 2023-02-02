const {CommentModel, UserModel, PostModel} = require('../models')

class CommentService {
    #genericRetrieveQuery = {
        attributes: [
            'text',
            ['PostId', 'postId'],
            'createdAt'
        ],
        include: [
            {
                model: UserModel,
                required: true,
                attributes: ['id', 'name', 'avatar'],
            },
            {
                model: PostModel,
                required: true,
                attributes: []
            }
        ]
    }

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

    async retrieveOne(id) {
        const retrieveOneQuery = this.#genericRetrieveQuery
        retrieveOneQuery.where = {id: id}

        const comment = await CommentModel
            .findOne(retrieveOneQuery)
            .catch((error) => {
                console.log(error)
                throw new Error('Something went wrong')
            })

        if (comment === null) {
            throw new Error('Comment not found')
        }

        return comment
    }

    async retrieveAll(queryParams) {
        const retrieveAllQuery = this.#genericRetrieveQuery
        retrieveAllQuery.where = queryParams
        retrieveAllQuery.order = [['createdAt', 'DESC']]
        console.log(retrieveAllQuery);

        return await CommentModel
            .findAll(retrieveAllQuery)
            .catch((error) => {
                console.log(error)
                throw new Error('Something went wrong')
            })
    }

    async delete(id) {
        return await CommentModel
            .destroy({where: {id: id}})
            .then((isDeleted) => {
                if (isDeleted) {
                    return {success: true, message: 'Comment removed'}
                }
                return {success: false, message: 'Comment was not removed'}
            })
            .catch((error) => {
                console.log(error);
                throw new Error('Comment Delete Operation Failed');
            });
    }
}

module.exports = new CommentService()