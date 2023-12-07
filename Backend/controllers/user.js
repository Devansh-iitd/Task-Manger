const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/users');


const navBarpic = async(req,res) => {

    const profilePic = await req.user.profilePic;
     
    res.status(200).json({
        profilePic
    });


}

module.exports={ navBarpic
};