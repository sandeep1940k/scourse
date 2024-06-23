const express = require('express');
const router = express.Router();

router.use('/authentication', require('./authentication'));
router.use('/common', require('./common'));
router.use('/reactjs', require('./react'));


module.exports = router;
