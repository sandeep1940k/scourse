const express = require('express');
const router = express.Router();
const questionAnswerController = require('../controller/reactjs/question-answer.controller');

router.post('/question-answer/:userId', questionAnswerController.saveQuestionAnswer);
router.get('/question-answer', questionAnswerController.getQuestionAnswer);
router.delete('/question-answer/:id', questionAnswerController.deleteQuestionAnswer);

module.exports = router;
