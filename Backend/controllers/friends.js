const FriendShip = require('../models/friendShip')
const User = require('../models/users')

const AddFriend = async (req, res) => {
  const { username } = req.body

  const rec = await User.findOne({ username: username })

  const f1 = await FriendShip.findOne({
    requester: req.user._id,
    recipient: rec._id,
  })
  const f2 = await FriendShip.findOne({
    requester: rec._id,
    recipient: req.user._id,
  })
  if (f1 || f2) {
    return res.status(400).send('Friend Request already sent')
  }

  const friendShip = new FriendShip({
    requester: req.user._id,
    recipient: rec._id,
    status: 'requested',
  })
  await friendShip.save()

  const req1 = await User.findById(req.user._id)
  req1.friendsRequest.push(friendShip._id)

  await req1.save()
  const req2 = await User.findById(rec._id)
  req2.friendsRequest.push(friendShip._id)
  await req2.save()

  return res.status(201).send('Friend Request Sent')
}

const ChangeStatus = async (req, res) => {
  const { requester, status } = req.body

  if (status === 'accept') {
    AcceptFriend(req, res)
  } else if (status === 'reject') {
    RejectFriend(req, res)
  }
}

const AcceptFriend = async (req, res) => {
  console.log(req.body)
  const { username } = req.body
  const r = await User.findOne({ username })

  const friendShip = await FriendShip.findOne({
    requester: r._id,
    recipient: req.user._id,
  })
  if (!friendShip) {
    return res.status(400).send('Friend Request does not exist')
  }
  //console.log(friendShip);
  friendShip.status = 'friends'

  const req1 = await User.findById(r._id)
  const req2 = await User.findById(req.user._id)
  req1.friends.push(req2._id)
  await req1.save()
  req2.friends.push(req1._id)

  await friendShip.save()

  await req2.save()

  req1.friendsRequest.pull(friendShip._id)
  await req1.save()
  req2.friendsRequest.pull(friendShip._id)

  await req2.save()

  res.status(201).send('Friend Request Accepted')
}

const RejectFriend = async (req, res) => {
  console.log(req.body)

  const { requester } = req.body

  const r = await User.findOne({ username: requester })

  const friendShip = await FriendShip.findOne({
    requester: r._id,
    recipient: req.user._id,
  })
  if (!friendShip) {
    res.status(400).send('Friend Request does not exist')
  }
  friendShip.status = 'rejected'

  await friendShip.save()

  const req1 = await User.findById(r._id)
  const req2 = await User.findById(req.user._id)

  req1.friendsRequest.pull(friendShip._id)
  await req1.save()
  req2.friendsRequest.pull(friendShip._id)

  await req2.save()

  res.status(201).send('Friend Request Rejected')
}

const ShowFriends = async (req, res) => {
  const user = await User.findById(req.user._id)
    .populate('friendsRequest')
    .populate('friends')

  await FriendShip.populate(user.friendsRequest, {
    path: 'requester',
    model: 'User',
  })
  //await User.populate(user.friends, {path: 'username', model: 'User'});

  const friends = user.friends.map((object) => {
    return {
      username: object.username,
      profilePic: object.profilePic,
    }
  })
  // const friendsRequest = user.friendsRequest.map(object => object.requester.username);

  //const allFriends = friends.concat(friendsRequest);

  //console.log(user.friends);

  res.status(200).json(friends)
}

const ShowFriendsRequest = async (req, res) => {
  const user = await User.findById(req.user._id)
    .populate('friendsRequest')
    .populate({
      path: 'friendsRequest',
      populate: [
        {
          path: 'requester',
          model: 'User',
        },
        {
          path: 'recipient',
          model: 'User',
        },
      ],
    })

  const friendsRequests = user.friendsRequest.map((object) => {
    // console.log(object.requester._id, req.user._id);
    if (object.requester._id.equals(req.user._id)) {
      return {
        username: object.recipient.username,
        profilePic: object.recipient.profilePic,
        status: object.status,
        requester: true,
      }
    } else {
      return {
        username: object.requester.username,
        profilePic: object.requester.profilePic,
        status: object.status,
        requester: false,
      }
    }
  })

  res.status(200).json(friendsRequests)
}

const SearchFriend = async (req, res) => {
  const { query, friends } = req.query
  //console.log(req.user);

  const regex = new RegExp(query, 'i')

  const users = await User.find({ username: { $regex: regex } })

  if (!users) {
    res.status(400).send('No user found')
  }

  const results = users.map((object) => {
    if (friends === 'true') {
      if (req.user.friends.includes(object._id)) {
        return {
          username: object.username,
          profilePic: object.profilePic,
        }
      }
    } else {
      if (req.user.friends.includes(object._id)) {
        return null
      }
      return {
        username: object.username,
        profilePic: object.profilePic,
      }
    }
  })

  res.status(200).json(results)
}
module.exports = {
  AddFriend,
  AcceptFriend,
  RejectFriend,
  ShowFriends,
  ChangeStatus,
  SearchFriend,
  ShowFriendsRequest,
}
