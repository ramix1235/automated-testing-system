const mongoose = require('mongoose');

const { Schema } = mongoose;

const ClosedQuestionSchema = new Schema({
    question: String,
    answer: Boolean,
    etalon: Boolean,
    evaluation: Number
});


const OpenedQuestionSchema = new Schema({
    question: String,
    answer: String,
    etalon: String,
    evaluatorType: String,
    evaluation: Number
});

const PassedTestSchema = new Schema({
    title: String,
    description: String,
    closedQuestions: [ClosedQuestionSchema],
    openedQuestions: [OpenedQuestionSchema],
    totalEvaluation: Number,
    user: Schema.Types.ObjectId
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    },
});

mongoose.model('PassedTest', PassedTestSchema);