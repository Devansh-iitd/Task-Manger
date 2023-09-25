const express = require('express');
const router = express.Router();
const friends = require('../controllers/friends');
const passport = require('passport');
const catchAsync = require('../utils/catchasync');

router.route('/')
    .get(passport.authenticate('jwt', { session: false }), catchAsync(friends.ShowFriends))
    .post(passport.authenticate('jwt', { session: false }), catchAsync(friends.AddFriend))
    .put(passport.authenticate('jwt', { session: false }), catchAsync(friends.ChangeStatus))
    .delete(passport.authenticate('jwt', { session: false }), catchAsync(friends.RejectFriend))

module.exports = router;
