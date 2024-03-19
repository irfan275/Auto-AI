const express = require('express');
const router = express.Router();
const {validationRules} = require('../validators/user_validator');
const {validate} = require('../validators/validate');
const { loginUser } = require('../controller/userController');

router.post('/login', validationRules.login(),validate,loginUser);

module.exports = router;