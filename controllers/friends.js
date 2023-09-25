const FriendShip = require('../models/friendShip');
const User = require('../models/users');


const AddFriend = async (req, res) => {
    const { recipient } = req.body;
    
    const rec = await User.findOne({ email: recipient });
    

    const friendShip = new FriendShip({
        requester: req.user._id,
        recipient: rec._id,
        status: 'requested'
    })
    await friendShip.save();

    const req1 = await User.findById(req.user._id);
    req1.friendsRequest.push(friendShip._id);

    await req1.save();
    const req2 = await User.findById(rec._id);
    req2.friendsRequest.push(friendShip._id);
    await req2.save();

    res.status(201).send('Friend Request Sent');
}

const ChangeStatus = async (req, res) => {
    const { requester, status } = req.body;

    if (status === 'accept') {
        AcceptFriend(req,res);
    }
    else if (status === 'reject') {
        RejectFriend(req,res);
    }

}

const AcceptFriend = async (req, res) => {
    console.log(req.body);
    const { requester } = req.body;
    const r = await User.findOne({ username: requester });

    const friendShip = await FriendShip.findOne({ requester: r._id, recipient: req.user._id });
    if (!friendShip) {
        res.status(400).send('Friend Request does not exist');
    }
    friendShip.status = 'friends';

    const req1 = await User.findById(r._id);
    const req2 = await User.findById(req.user._id);
    req1.friends.push(req2._id);
    await req1.save();
    req2.friends.push(req1._id);

    await friendShip.save();
   
    await req2.save();

    req1.friendsRequest.pull(friendShip._id);
    await req1.save();
    req2.friendsRequest.pull(friendShip._id);

   
    await req2.save();


    res.status(201).send('Friend Request Accepted');
}

const RejectFriend = async (req, res) => {

    const { requester } = req.body;

    const r = await User.findOne({ username: requester });

    const friendShip = await FriendShip.findOne({ requester: r._id, recipient: req.user._id });
    if (!friendShip) {
        res.status(400).send('Friend Request does not exist');
    }
    friendShip.status = 'rejected';

    await friendShip.save();

    const req1 = await User.findById(r._id);
    const req2 = await User.findById(req.user._id);

    req1.friendsRequest.pull(friendShip._id);
    await req1.save();
    req2.friendsRequest.pull(friendShip._id);

   
    await req2.save();


    res.status(201).send('Friend Request Rejected');
}

const ShowFriends = async (req, res) => {

    const user = await User.findById(req.user._id).populate('friendsRequest').populate('friends');
    

       await FriendShip.populate(user.friendsRequest, {path: 'requester', model: 'User'});
       //await User.populate(user.friends, {path: 'username', model: 'User'});
        
       const friends = user.friends.map(object => object.username);
         const friendsRequest = user.friendsRequest.map(object => object.requester.username);

        const allFriends = friends.concat(friendsRequest);


    //console.log(user.friends);

    res.status(200).json(allFriends);
}


module.exports = {
    AddFriend,
    AcceptFriend,
    RejectFriend,
    ShowFriends,
    ChangeStatus
}
