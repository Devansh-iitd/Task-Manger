const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')
//const FriendShip = require('./friendShip');

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
    },

    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    friendsRequest: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'FriendShip' },
    ],
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
    profilePic: {
      type: String,
      default: 'https://www.w3schools.com/howto/img_avatar.png',
    },
  },

  // The following lines will add createdAt and updatedAt
  // fields to our models if the schema is set up to use them
  // This is important because we'll want to know when
  // our users are created and modified!
  { timestamps: true }
)

UserSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('User', UserSchema)
