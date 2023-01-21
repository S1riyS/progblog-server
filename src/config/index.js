const dotenv = require('dotenv').config({path: `.env.${process.env.NODE_ENV}`})

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (dotenv.error) {
    throw new Error("⚠️ Couldn't find env file ⚠️");
}

module.exports = {
    port: parseInt(process.env.PORT, 10),

    databaseURL: 'DATABASE_URI_PLACEHOLDER',

    api: {
        prefix: '/api',
    },
}