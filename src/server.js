const app = require('./app')
const config = require('./config')
const sequelize = require('./config/db.config')

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize
            .sync({alter: true})
            .then(() => {
                console.log('Connection with database established successfully');
            })
            .catch(() => {
                console.log('Some errors have occurred during establishing connection with database');
            })
        app.listen(config.port, () => {
            console.log(`Application is running on port ${config.port}`)
        })
    } catch (e) {
        console.log(e)
    }
}


start()
