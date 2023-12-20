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
       <div className=' w-72 h-52 rounded-xl bg-white m-9'>
        <div className=' w-32 h-6 rounded mt-4 ml-4' style={{backgroundColor:'#A3E5D1'}}>
          <a className=' text-base font-medium text-black font-sans my-auto mx-auto'>{name}</a>

        </div>
        <img src={profilePic} className=" w-32 h-20 rounded-lg mx-auto my-8"/>
       
        
        
        {(!requester && !friends)?
         <button type="button" className="bg-gradient-to-r from-green-600 to-green-300 rounded-md text-white    h-6 hover:cursor-pointer ml-10 mb-4 px-1" value={name} onClick={accept}>Accept</button>
         :<><p className="text-left pl-4 font-medium">{status}</p></>
        }
        

       </div>
    )
}

export default FriendsCard;