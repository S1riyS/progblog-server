const Application = require('./app')

async function main() {
    await Application.setupDatabase()
    await Application.setupExpress()
    await Application.setupServer()
}

main()