const express = require('express');
const router = express.Router();
const signupController = require('../controller/signup.controller');

router.post('/signup', signupController.createAccount)
router.get('/login', signupController.login)

module.exports = router;
