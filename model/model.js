const mongoose = require("mongoose");

const taskScheme = new mongoose.Schema({
    work: {
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        required: true
    }

})

const taskModel = mongoose.model('task', taskScheme);

module.exports = taskModel;