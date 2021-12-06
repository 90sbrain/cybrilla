const mongoose = require('mongoose')

const URLSchema = new mongoose.Schema({
    urlShortCode: String,
    exactUrl: String,
    date: {
        type: String,
        default: Date.now
    },
    shortUrl: String
})

module.exports = mongoose.model('shortCode', URLSchema)