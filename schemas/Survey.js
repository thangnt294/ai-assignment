const mongoose = require('mongoose')

const Schema = mongoose.Schema

const surveySchema = new Schema({
    courseName: {type: String, required: true},
    isOpen: {type: Boolean, required: true},
    score: {type: Number, required: false},
    rating: {type: String, required: false},
    createdDate: {type: Number, required: true, default: Date.now()},
    updatedDate: {type: Number, required: true, default: Date.now()},
    results: [
        {
            userId: {type: Schema.Types.ObjectId, required: true},
            rating: {
                criterion1: {type: Number, required: true},
                criterion2: {type: Number, required: true},
                criterion3: {type: Number, required: true},
                criterion4: {type: Number, required: true},
                criterion5: {type: Number, required: true},
                criterion6: {type: Number, required: true},
                criterion7: {type: Number, required: true},
                criterion8: {type: Number, required: true},
                criterion9: {type: Number, required: true},
                criterion10: {type: Number, required: true},
            },
        }
    ]
})

const Survey = mongoose.model('Survey', surveySchema)

module.exports = Survey