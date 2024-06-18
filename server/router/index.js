const express = require('express');
const router = express.Router();

router.use('/authentication', require('./authentication'));
router.use('/common', require('./common'));


module.exports = router;
