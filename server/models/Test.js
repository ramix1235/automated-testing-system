const mongoose = require('mongoose');

const { Schema } = mongoose;

const closedQuestionSchema = new Schema({
    question: String,
    etalon: Boolean
});

const openedQuestionSchema = new Schema({
    question: String,
    etalon: String
});

const TestSchema = new Schema({
    title: String,
    description: String,
    closedQuestions: [closedQuestionSchema],
    openedQuestions: [openedQuestionSchema],
    author: Schema.Types.ObjectId
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    },
});

mongoose.model('Test', TestSchema);