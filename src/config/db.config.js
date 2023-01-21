const {Sequelize} = require('sequelize');

const config = require('./index')

const sequelize = new Sequelize(config.database.name, config.database.username, config.database.password, {
    dialect: 'postgres',
    host: config.database.host,
    port: config.database.port
});

module.exports = sequelize;