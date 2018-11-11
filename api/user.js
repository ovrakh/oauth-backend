const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user-controller');

router.get('/user/logout', userCtrl.logout.bind(userCtrl));

router.post('/user/sign-in', userCtrl.signIn.bind(userCtrl));

module.exports = router;