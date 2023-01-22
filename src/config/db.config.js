const {Sequelize} = require('sequelize');

const config = require('./index')

module.exports = new Sequelize(
    config.database.name,
    config.database.username,
    config.database.password,
    {
        dialect: 'postgres',
        host: config.database.host,
        port: config.database.port
    }
);