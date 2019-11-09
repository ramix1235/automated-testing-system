const mongoose = require('mongoose');

const { Schema } = mongoose;

const closedQuestionSchema = new Schema({
    question: String,
    answer: Boolean,
    etalon: Boolean,
    evaluation: Number
});

const openedQuestionSchema = new Schema({
    question: String,
    answer: String,
    etalon: String,
    evaluation: Number
});

const PassedTestSchema = new Schema({
    title: String,
    description: String,
    closedQuestions: [closedQuestionSchema],
    openedQuestions: [openedQuestionSchema],
    totalEvaluation: Number,
    user: Schema.Types.ObjectId
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    },
});

mongoose.model('PassedTest', PassedTestSchema);