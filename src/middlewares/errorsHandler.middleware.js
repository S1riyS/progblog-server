module.exports = function (error, req, res, next) {
    res.status(error.status || 500)
    res.json({
        status: error.status || 500,
        message: error.message,
    })
    next()
}