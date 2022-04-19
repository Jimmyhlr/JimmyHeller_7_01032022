const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');


router.post('/signup', auth.validateRegister, userCtrl.signup, userCtrl.login);
router.post('/login', userCtrl.login);
router.get('/userinfos', auth.isLoggedIn, userCtrl.userinfos);
router.post('/deleteAccount', auth.isLoggedIn, userCtrl.deleteAccount);

module.exports = router;