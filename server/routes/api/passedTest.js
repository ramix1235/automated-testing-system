const mongoose = require('mongoose');
const router = require('express').Router();
const auth = require('../auth');
const evaluatorService = require('../../evaluatorService');
const EVALUATOR_TYPE = require('../../constants/evaluators');

const PassedTest = mongoose.model('PassedTest');

router.post('/', auth.required, (req, res, next) => {
    const { body: { passedTest } } = req;
    const { payload: { id: userId } } = req;

    if (!passedTest) {
        return res.status(422).json({
            errors: {
                passedTest: 'is required'
            },
        });
    }

    const evaluatedClosedQuestions = passedTest.closedQuestions.map(closedQuestion => ({
        ...closedQuestion,
        evaluation: closedQuestion.answer === closedQuestion.etalon ? 100 : 0
    }));
    const evaluatedOpenedQuestions = passedTest.openedQuestions.map(openedQuestion => ({
        ...openedQuestion,
        evaluation: evaluatorService.evaluate(openedQuestion.answer, openedQuestion.etalon, openedQuestion.etalonNodes, openedQuestion.etalonLinks, openedQuestion.weightOfWords, openedQuestion.evaluatorType)
    }));
    const totalEvaluation = [...evaluatedClosedQuestions, ...evaluatedOpenedQuestions].reduce((total, question, index, array) => {
        if (index === array.length - 1) {
            return (total + question.evaluation) / array.length;
        }

        return total + question.evaluation;
    }, 0)

    const evaluatedPassedTest = {
        ...passedTest,
        totalEvaluation: totalEvaluation,
        closedQuestions: evaluatedClosedQuestions,
        openedQuestions: evaluatedOpenedQuestions
    }

    const newPassedTest = new PassedTest(evaluatedPassedTest);

    return newPassedTest.save()
        .then(() => getAllPassedTests(res, userId));
});

router.delete('/:id', auth.required, (req, res, next) => {
    const id = req.params.id;
    const { payload: { id: userId } } = req;

    if (!id) {
        return res.status(422).json({
            errors: {
                id: 'is required'
            },
        });
    }

    return PassedTest.findOneAndRemove({ _id: id, user: userId })
        .then(() => getAllPassedTests(res, userId));
});

router.get('/:id?', auth.required, (req, res, next) => {
    const id = req.params.id;
    const { payload: { id: userId } } = req;
    const passedTestProjection = {
        __v: false
    };

    if (!id) {
        return getAllPassedTests(res, userId);
    }

    return PassedTest.find({ _id: id, user: userId }, passedTestProjection)
        .then(passedTest => {
            if (!passedTest) {
                return res.sendStatus(400);
            }

            return res.json({ passedTest: transformPassedTest(passedTest) });
        });
});

function getAllPassedTests(res, userId) {
    const passedTestProjection = {
        __v: false
    };

    return PassedTest.find({ user: userId }, passedTestProjection)
        .sort('-createdAt')
        .then(passedTests => {
            return res.json({
                passedTests: passedTests.map(passedTest => transformPassedTest(passedTest))
            });
        })
}

function transformPassedTest(passedTest) {
    const { _doc } = passedTest;
    const { _id, closedQuestions, openedQuestions, ...otherPassedTestData } = _doc;

    otherPassedTestData.id = _id;
    otherPassedTestData.closedQuestions = closedQuestions.map(question => {
        const { _doc } = question;
        const { _id, ...otherQuestionData } = _doc;
        otherQuestionData.id = _id;

        return otherQuestionData;
    });
    otherPassedTestData.openedQuestions = openedQuestions.map(question => {
        const { _doc } = question;
        const { _id, ...otherQuestionData } = _doc;
        otherQuestionData.id = _id;

        return otherQuestionData;
    });

    return otherPassedTestData;
}


module.exports = router;