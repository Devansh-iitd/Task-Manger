import React from 'react';
import FriendsCard from '../components/friendsCard';
import {useState, useEffect} from 'react';
import axios from 'axios';



const Social = () => {

    const [friends, setFriends] = useState([]);
    const [requests, setRequests] = useState([]);
    const [clicked, setClicked] = useState(false);
    //const [query, setQuery] = useState("");
    

    useEffect(() => {

        

        const fetchData = async () => {

            const url = "http://localhost:8080/friends";
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
            })

            //console.log(response.data);
            setFriends(response.data);
        }
        fetchData();

        const fetchRequests = async () => {
                
                const url = "http://localhost:8080/friends/requests";
                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "application/json",
                    },
                })
    
               // console.log(response.data);
                setRequests(response.data);
            }
            fetchRequests();
    }
    , [clicked]);

    const [results, setResults] = useState([]);

    const handleChange = async(evt) => {


        console.log(evt.target.value);
        const query = evt.target.value;
        if(query === ""){
            setResults([]);
            return;
        }
        
        const url = "http://localhost:8080/friends/search";
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
            params: {
                query: query,
            },
        });

    
        setResults(response.data);
    }

    const addFriend = async(evt) => {
        
        const username = evt.target.value;
        const url = "http://localhost:8080/friends/add";
        try{
        const response = await axios.post(url,{
            username: username,
        },{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        });
        console.log(response);
        setClicked(!clicked);
        
    }
    catch(err){
        console.log(err);
        //window.location.href = "/social";
    }
    }

    const acceptRequest = async(evt) => {

        const username = evt.target.value;
        const url = "http://localhost:8080/friends/accept";
        try{
        const response = await axios.put(url,{
            username: username,
        },{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        });
        console.log(response);
        setClicked(!clicked);
    }
    catch(err){
        console.log(err);
        
    }
    }
        



        







    return(
        <>
       <div className=" mt-16 ml-96" >
    
    <form  className="max-w-[480px] w-full px-4">
        <div className="relative">

            
            <input type="text" name="userSearch" className="w-full border h-12 shadow p-4 rounded-full" placeholder="search users" onChange={handleChange}/>
            <div className="my-4">
      {results.length > 0 ? (
        <ul className="divide-y divide-gray-200">
          {results.map((result, index) => (

            
            <li key={index} className="py-4">
              
              <p className="text-lg font-semibold">
                <img src={result.profilePic} className="w-10 h-10 rounded-full"/>
                {result.username}
              <button type="button" className="bg-gradient-to-r from-green-600 to-green-300 rounded-md text-white    h-6 hover:cursor-pointer ml-10 mb-10 px-1" value={result.username} onClick={addFriend}>Add Friend</button>
              </p>
              
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No results found.</p>
      )}
    </div>
            <button type="submit">
                <img src="https://img.icons8.com/ios-glyphs/30/000000/search--v1.png" className="absolute top-3 right-4"/>
        </button>
        </div>
    </form>



       </div>
       <div className='flex justify-around'>
       <div className=" w-3/5">
        <h1 className="text-3xl font-semibold mt-10 ml-4 mb-6">Friends</h1>
        <div className="flex flex-wrap">
        { friends.map((friend) => {
            return <FriendsCard data={{
                friend:friend,
                friends:true
            }
            } />
        }
        )}
        </div>
            
       </div>
       <div className=" w-1/3">
         <h1 className="text-3xl font-semibold mt-10 ml-4 mb-6">Friend Requests</h1>
        <div className=" flex flex-wrap">
         { requests.map((request) => {
                return <FriendsCard data={{
                    friend: request,
                    acceptRequest: acceptRequest,
                }} />
          }
          )}
          </div>

       </div>
         </div>
        </>
    )

}

export default Social;