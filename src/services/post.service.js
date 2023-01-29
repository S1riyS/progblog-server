const {PostModel, TagModel, UserModel} = require('../models')

class PostService {
    async create(newPost) {
        return await PostModel
            .create({
                banner: newPost.banner,
                title: newPost.title,
                content: newPost.content,
                UserId: newPost.userId
            })
            .catch((error) => {
                console.log(error)
                throw new Error('Error while creating post')
            })
    }

    async retrieveOne(id) {
        const tag = await PostModel
            .findOne({
                where: {
                    id: id
                },
                attributes: [
                    'id',
                    'title',
                    'content',
                    'views',
                    'createdAt',
                ],
                include: [
                    {
                        model: TagModel,
                        required: false,
                        attributes: ['id', 'name'],
                        through: {
                            attributes: [],
                        }
                    },
                    {
                        model: UserModel,
                        required: true,
                        attributes: ['id', 'name', 'avatar']
                    }
                ]
            })
            .catch((error) => {
                console.log(error)
                throw new Error('Something went wrong')
            })

        if (tag === null) {
            throw new Error('Post not found')
        }

        return tag
    }

    async retrieveAll() {
        const posts = await PostModel
            .findAll({
                attributes: [
                    'id',
                    'title',
                    'content',
                    'views',
                    'createdAt',
                ],
                include: [
                    {
                        model: TagModel,
                        required: false,
                        attributes: ['id', 'name'],
                        through: {
                            attributes: [],
                        }
                    },
                    {
                        model: UserModel,
                        required: true,
                        attributes: ['id', 'name', 'avatar']
                    }
                ],
                order: [['createdAt', 'DESC']],
            })
            .catch((error) => {
                console.log(error);
                throw new Error('Something went wrong')
            })

        if (posts.length === 0) {
            throw new Error('Tags not found')
        }

        return posts
    }

    async delete(id) {
        await PostModel
            .destroy({where: {id: id}})
            .then(() => ({status: true, message: 'Post Removed'}))
            .catch((error) => {
                console.log(error);
                throw new Error('Post Delete Operation Failed');
            });
    }

    async incrementViews(id) {
        await PostModel
            .increment('views', {
                by: 1,
                where: { id: id },
            })
            .then(() => ({status: true, message: 'Post views incremented'}))
            .catch((error) => {
                console.log(error);
                throw new Error('Post Views Incrementation Failed');
            })
    }
}

module.exports = new PostService()