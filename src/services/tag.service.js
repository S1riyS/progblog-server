const {Sequelize} = require("sequelize");
const {TagModel} = require('../models')

class TagService {
    async create(newTag) {
        return await TagModel.create({name: newTag.name})
            .catch((error) => {
                console.log(error)
                throw new Error('Error while creating tag')
            })
    }

    async bulkCreate(tags) {
        return await TagModel.bulkCreate(tags)
            .catch((error) => {
                console.log(error)
                throw new Error('Error while creating tags')
            })
    }

    async retrieveOne(tagName) {
        const tag = await TagModel.findOne({
            where: {
                name: tagName
            }
        }).catch((error) => {
            console.log(error)
            throw new Error('Something went wrong')
        })

        if (tag === null) {
            throw new Error('Tag not found')
        }

        return tag
    }

    async retrieveAll() {
        const tags = TagModel.findAll({
            attributes: [
                'id',
                'name',
                [Sequelize.fn('COUNT', Sequelize.col('posts.id')), 'posts_count'],
            ],
            order: [[Sequelize.col('posts_count'), 'DESC']],
        }).catch((error) => {
            console.log(error);
            throw new Error('Something went wrong')
        })

        if (tags === null) {
            throw new Error('Tags not found')
        }

        return tags
    }
}

module.exports = new TagService()
