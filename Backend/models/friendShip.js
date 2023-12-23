const mongoose = require('mongoose')

const FriendShipSchema = new mongoose.Schema(
  {
    requester: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: {
      type: String,
      enums: ['requested', 'pending', 'friends'],
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('FriendShip', FriendShipSchema)
