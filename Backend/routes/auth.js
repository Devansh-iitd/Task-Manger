const express = require('express')
const router = express.Router()
const passport = require('passport')
const authcontroller = require('../controllers/authcontroller')
const jwt = require('jsonwebtoken')
const catchasync = require('../utils/catchasync')

router.route('/register').post(catchasync(authcontroller.register))

router
  .route('/login')
  .post(passport.authenticate('local', { session: false }), (req, res) => {
    jwt.sign(
      { id: req.user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) {
          console.log(err)
          res.status(500).send('Internal Server Error')
        }
        res.status(200).json({
          success: true,
          token: token,
        })
      }
    )
  })

module.exports = router
