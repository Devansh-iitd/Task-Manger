const express = require('express');
const router = express.Router();
const friends = require('../controllers/friends');
const passport = require('passport');
const catchAsync = require('../utils/catchasync');

router.route('/')
    .get(passport.authenticate('jwt', { session: false }), catchAsync(friends.ShowFriends))
    .delete(passport.authenticate('jwt', { session: false }), catchAsync(friends.RejectFriend));

router.route('/add')
    .post(passport.authenticate('jwt', { session: false }), catchAsync(friends.AddFriend));

router.route('/search')
    .get(passport.authenticate('jwt', { session: false }), catchAsync(friends.SearchFriend));

router.route('/requests')
    .get(passport.authenticate('jwt', { session: false }), catchAsync(friends.ShowFriendsRequest));

router.route('/accept')
    .put(passport.authenticate('jwt', { session: false }), catchAsync(friends.AcceptFriend));

module.exports = router;
