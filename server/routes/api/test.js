const mongoose = require('mongoose');
const router = require('express').Router();
const auth = require('../auth');

const Test = mongoose.model('Test');

router.post('/', auth.required, (req, res, next) => {
    const { body: { test } } = req;

    if (!test) {
        return res.status(422).json({
            errors: {
                test: 'is required',
            },
        });
    }

    const newTest = new Test(test);

    return newTest.save()
        .then(() => {
            const testProjection = {
                __v: false
            };

            return Test.find({}, testProjection)
                .then(tests => {
                    return res.json({
                        tests: tests.map(test => transformTest(test))
                    });
                })
        });
});

router.put('/', auth.required, (req, res, next) => {
    console.log(req.query.id);
});

router.delete('/', auth.required, (req, res, next) => {
    console.log(req.body);
});

router.get('/:id?', auth.required, (req, res, next) => {
    const id = req.params.id;
    const testProjection = {
        __v: false
    };

    if (!id) {
        return Test.find({}, testProjection)
            .then(tests => {
                return res.json({
                    tests: tests.map(test => transformTest(test))
                });
            })
    }

    return Test.findById(id, testProjection)
        .then(test => {
            if (!test) {
                return res.sendStatus(400);
            }

            return res.json({ test: transformTest(test) });
        });
});

function transformTest(test) {
    const { _doc } = test;
    const { _id, closedQuestions, openedQuestions, ...otherTestData } = _doc;

    otherTestData.id = _id;
    otherTestData.closedQuestions = closedQuestions.map(question => {
        const { _doc } = question;
        const { _id, ...otherQuestionData } = _doc;
        otherQuestionData.id = _id;

        return otherQuestionData;
    });
    otherTestData.openedQuestions = openedQuestions.map(question => {
        const { _doc } = question;
        const { _id, ...otherQuestionData } = _doc;
        otherQuestionData.id = _id;

        return otherQuestionData;
    });

    return otherTestData;
}


module.exports = router;