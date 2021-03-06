const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');


router.post('/signup', userCtrl.signup, userCtrl.login);
router.post('/login', userCtrl.login);
router.get('/userinfos', auth.isLoggedIn, userCtrl.userinfos);
router.post('/deleteAccount', auth.isLoggedIn, userCtrl.deleteAccount);

module.exports = router;