const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/dbtable', { useNewUrlParser: true, useUnifiedTopology: true })
const Schema = mongoose.Schema
const peopleSchema = new Schema({
    name: {
        type: String,
        default: ''
    }
})
const People = mongoose.model('People', peopleSchema, 'people')
module.exports = People