const mongoose = require('mongoose');

const userPostSchema = mongoose.Schema({

    userID: {
        type: String,
        required: true,
    },

    title: {
        type: String,
        required: true,
    },

    message: {
        type: String,

    },
    data: {
        type: Date,
        default: Date.now
    }
})

module.exports =  mongoose.model('UserPost', userPostSchema);