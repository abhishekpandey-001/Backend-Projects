const mongoose = require('mongoose')

async function connectToMongoDb(){
    return mongoose.connect(url)
}

module.exports = {
    connectToMongoDb
}