const mongoose = require('mongoose');

const { Schema } = mongoose;

const closedQuestionSchema = new Schema({
    question: String,
    answer: Boolean
});

const openedQuestionSchema = new Schema({
    question: String,
    answer: String
});

const TestSchema = new Schema({
    title: String,
    description: String,
    closedQuestions: [closedQuestionSchema],
    openedQuestions: [openedQuestionSchema],
    author: Schema.Types.ObjectId
});

mongoose.model('Test', TestSchema);