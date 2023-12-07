const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchasync');
const { navBarpic } = require('../controllers/user');





router.route('/profilePic')
.get(passport.authenticate('jwt',{session:false}),catchAsync(navBarpic));


module.exports = router;