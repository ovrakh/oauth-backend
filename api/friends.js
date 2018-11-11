const express = require('express');
const router = express();

const authService = require('../services/auth-service');
const friendCtrl = require('../controllers/friend-controller');

router.get('/friends', authService.asUser.bind(authService), friendCtrl.getAll.bind(friendCtrl));

module.exports = router;