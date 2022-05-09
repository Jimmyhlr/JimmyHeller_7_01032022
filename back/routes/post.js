const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');


router.post('/newPost', auth.isLoggedIn, multer, postCtrl.newPost);
router.post('/deletePost', auth.isLoggedIn, postCtrl.deletePost);
router.post('/deleteComment', auth.isLoggedIn, postCtrl.deleteComment);
router.get('/feed', auth.isLoggedIn, postCtrl.retrieveAllPosts);
router.get('/getComments', auth.isLoggedIn, postCtrl.getComments);


module.exports = router;