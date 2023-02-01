const {CommentModel, UserModel} = require('../models')

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
}

module.exports = new CommentService()