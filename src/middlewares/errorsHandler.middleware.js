module.exports = class ErrorHandler {
    static handle = () => {
        return async (error, req, res, next) => {
            const message = error.message || 'Unexpected error'

            let errorDetails = {
                success: false,
                message: message
            }

            if (process.env.NODE_ENV === 'development') {
                errorDetails.stack = error.stack
            }

            const status = error.status || 500
            res.status(status).send(errorDetails)
        }
    }
}