import React from 'react';


const FriendsCard = (props) => {

    //console.log(props.data);

    const {friend} = props.data;
    //console.log(friend);
    const profilePic = friend.profilePic;
    const name = friend.username;
    const status = friend.status;
    const requester = friend.requester;
   const accept = props.data.acceptRequest;
    const { friends} = props.data;
  // console.log(status);
    

    //console.log(friend);

    return(
       <div className='flex flex-col px-2 w-52 shadow-lg  bg-gradient-to-br from-teal-100 to-teal-400 rounded-3xl m-3'>
        <img src={profilePic} className="w-20 h-20 rounded-full ml-4 mt-4"/>
        <h1 className="text-left pl-4 font-semiabold text-2xl">{name}</h1>
        <p className="text-left pl-4 font-medium"></p>
        
        {(!requester && !friends)?
         <button type="button" className="bg-gradient-to-r from-green-600 to-green-300 rounded-md text-white    h-6 hover:cursor-pointer ml-10 mb-4 px-1" value={name} onClick={accept}>Accept</button>
         :<><p className="text-left pl-4 font-medium">{status}</p></>
        }
        

       </div>
    )
}

export default FriendsCard;