const express = require('express');
const router = express.Router();
const questionController = require('../controller/question.controller');

router.post('/question/:userId', questionController.saveQuestion);
router.get('/question/:userId', questionController.getQuestion);

module.exports = router;
