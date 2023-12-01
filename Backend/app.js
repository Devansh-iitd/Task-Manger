if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const db = mongoose.connection;
const User = require('./models/users');
const Task = require('./models/tasks');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const userRoutes = require('./routes/auth');
const FriendRoutes = require('./routes/friends');
const LocalStrategy = require('passport-local');
const cors = require('cors');

const JWTStraegy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;




mongoose.connect('mongodb://127.0.0.1:27017/Task-Manager', {
    /* useNewUrlParser: true,
     useCreateIndex: true,
     useUnifiedTopology: true these are already set to true in newer version of mongoose */
});
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Database connected");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());


passport.use(new LocalStrategy(User.authenticate()));

passport.use(new JWTStraegy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
}, async (payload, done) => {
    try {
        const user = await User.findById(payload.id);

        if (!user) {
            return done(null, false);
        }

        return done(null, user);
    } catch (error) {
        return done(error, false);
    }
}));




app.use(cors());
app.use('/', userRoutes);
app.use('/friends', FriendRoutes);
app.use('/tasks', require('./routes/tasks'));




app.use((err, req, res, next) => {
    const { statusCode = 500, message = 'Something Went Wrong' } = err;
    if (!err.message) err.message = 'Something Went Wrong'

    res.status(statusCode).send(err.message);
})







app.listen(8080, () => console.log('Example app listening on port 3080!'));




