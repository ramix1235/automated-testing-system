const express = require('express');
const router = express.Router();

router.use('/user', require('./user'));
router.use('/test', require('./test'));
router.use('/passedTest', require('./passedTest'));

module.exports = router;