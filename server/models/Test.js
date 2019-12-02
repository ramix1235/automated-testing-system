const mongoose = require('mongoose');

const { Schema } = mongoose;

const ClosedQuestionSchema = new Schema({
    question: String,
    etalon: Boolean
});

const OpenedQuestionSchema = new Schema({
    question: String,
    evaluatorType: String,
    etalon: String,
    etalonNodes: String,
    etalonLinks: String,
    weightOfWords: [{
        word: String,
        weight: Number
    }]
});

const TestSchema = new Schema({
    title: String,
    description: String,
    closedQuestions: [ClosedQuestionSchema],
    openedQuestions: [OpenedQuestionSchema],
    author: Schema.Types.ObjectId
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    },
});

mongoose.model('Test', TestSchema);