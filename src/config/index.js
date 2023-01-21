const dotenv = require('dotenv').config({path: `.env.${process.env.NODE_ENV}`})

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (dotenv.error) {
    throw new Error("⚠️ Couldn't find env file ⚠️");
}

module.exports = {
    port: parseInt(process.env.PORT, 10),

    database: {
        name: process.env.POSTGRES_DB,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRESS_PASSWORD,
        host: parseInt(process.env.POSTGRES_HOST, 10),
        port: parseInt(process.env.POSTGRESS_PORT, 10),
    },

    api: {
        prefix: '/api',
    },
}