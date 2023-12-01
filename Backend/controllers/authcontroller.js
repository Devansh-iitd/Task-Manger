const User = require('../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');




const register = async (req, res) => {

    console.log(req.body);

    const { username, email, password } = req.body;
   const existingEmail= await User.findOne({ email })
         if(existingEmail){
           return res.status(400).send("email already exists"
            );
         }

         const exisitingUsername=await User.findOne({ username })
         if(exisitingUsername){
             return res.status(400).send("Username already exists");
         }


       // console.log("coming here");

   

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


module.exports = { register };