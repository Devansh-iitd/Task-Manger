const User = require('../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');




const register = async (req, res) => {

    console.log(req.body);

    const { username, email, password } = req.body;
    await User.findOne({ email })
        .then(

            (user) => {
                //console.log(user)
                if (user) {
                    res.status(400).send('User already exists');
                }
            }


        )
        .catch(err => {
            console.log(err);
            res.status(500).send('Internal Server Error');
        });

        await User.findOne({ username })
        .then(

            (user) => {

                if (user) {
                    res.status(400).send('Username already exists');
                }
            }

        );

    /* const salt = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(password, salt);
     const user = new User({
         name,
         email,
         password: hashedPassword
     });*/

    const user = new User({
        username,
        email,
    });

    

    const registeredUser = await User.register(user, password);

    jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        res.status(200).json(
            {
                success: true,
                token: token,
            }
        )
    })






    //res.status(201).send('User created');





}

/*const login = async (req, res) => {
    const { email, password } = req.body;
    //console.log(req.body);

    await User.findOne({ email })
        .then(async user => {
            if (!user) {
                res.status(400).send('User does not exist');
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
                    if (err) {
                        console.log(err);
                        res.status(500).send('Internal Server Error');
                    }
                    res.status(200).json(
                        {
                            success: true,
                            token: token,
                        }
                    )
                })
            }
        }
        )



};*/

module.exports = { register };