const express = require('express')
const router = express.Router()
const Task = require('../models/tasks')
const passport = require('passport')
const catchAsync = require('../utils/catchasync')
const tasks = require('../controllers/tasks')

router
  .route('/')
  .get(
    passport.authenticate('jwt', { session: false }),
    catchAsync(tasks.ShowAllTasks)
  )

router
  .route('/add')
  .post(
    passport.authenticate('jwt', { session: false }),
    catchAsync(tasks.AddTask)
  )

router
  .route('/addmember/:id')
  .put(
    passport.authenticate('jwt', { session: false }),
    catchAsync(tasks.AddMemeber)
  )

router
  .route('/:id')
  .get(
    passport.authenticate('jwt', { session: false }),
    catchAsync(tasks.ShowTask)
  )

router
  .route('/update/:id')
  .put(
    passport.authenticate('jwt', { session: false }),
    catchAsync(tasks.UpdateTask)
  )

router
  .route('/delete/:id')
  .delete(
    passport.authenticate('jwt', { session: false }),
    catchAsync(tasks.DeleteTask)
  )

module.exports = router
