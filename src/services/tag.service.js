const {TagModel} = require('../models')

class TagService {
    async create(newTag) {
        return await TagModel
            .create({
                name: newTag.name,
                description: newTag.description
            })
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

    async check(tagName) {
        const tag = await TagModel.findOne({
            where: {
                name: tagName
            }
        })
        return tag !== null
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
        const tags = await TagModel.findAll()
            .catch((error) => {
                console.log(error);
                throw new Error('Something went wrong')
            })

        if (tags.length === 0) {
            throw new Error('Tags not found')
        }

        return tags
    }
}

module.exports = new TagService()
