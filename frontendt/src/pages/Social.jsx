import React from 'react'
import FriendsCard from '../components/friendsCard'
import { useState, useEffect } from 'react'
import axios from 'axios'
import SearchBar from '../components/SearchBar'
import tick from '../images/Tick.svg'
import cross from '../images/Cross.svg'

const Social = () => {
  const [friends, setFriends] = useState([])
  const [requests, setRequests] = useState([])
  const [clicked, setClicked] = useState(false)
  const [close, setClose] = useState(false)
  //const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const url = 'http://localhost:8080/friends'
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      })

      //console.log(response.data);
      setFriends(response.data)
    }
    fetchData()

    const fetchRequests = async () => {
      const url = 'http://localhost:8080/friends/requests'
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      })

      // console.log(response.data);
      setRequests(response.data)
    }
    fetchRequests()
  }, [clicked])

  const [results, setResults] = useState([])

  const addFriend = async (evt) => {
    const username = evt.target.value
    const url = 'http://localhost:8080/friends/add'
    try {
      const response = await axios.post(
        url,
        {
          username: username,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        }
      )
      console.log(response)
      setClicked(!clicked)
    } catch (err) {
      console.log(err)
      //window.location.href = "/social";
    }
    setClose(true)
  }

  const acceptRequest = async (evt) => {
    const username = evt.currentTarget.getAttribute('data-username')
    const url = 'http://localhost:8080/friends/accept'
    try {
      const response = await axios.put(
        url,
        {
          username: username,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        }
      )
      console.log(response)
      setClicked(!clicked)
    } catch (err) {
      console.log(err)
    }
  }

  const rejectRequest = async (evt) => {
    const url = 'http://localhost:8080/friends/'
    const requester = evt.currentTarget.getAttribute('data-username')

    try {
      const response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        data: {
          requester: requester,
        },
      })
      setClicked(!clicked)
      console.log(response)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <div className="grid grid-cols-5" style={{ height: '100vh' }}>
        <div
          className="col-span-4 h-full"
          style={{ backgroundColor: '#259875' }}
        >
          <h1 className=" text-5xl font-medium text-black mt-12 ml-24 w-fit font-sans ">
            Friends
          </h1>
          <form className=" mt-10 ml-24 w-fit">
            <div>
              <SearchBar
                data={{
                  results: results,
                  setResults: setResults,
                  name: 'userSearch',
                  placeholder: 'Search users',
                  setClose: setClose,
                }}
              />
              {
                <div className="my-4 w-fit">
                  {results.length > 0 && !close ? (
                    <ul className="divide-y divide-gray-200">
                      {results.map((result, index) =>
                        result !== null &&
                        result !== undefined &&
                        result.username !== localStorage.getItem('username') ? (
                          <li key={index} className="py-4">
                            <p className="text-lg font-semibold">
                              <img
                                src={result.profilePic}
                                className="w-10 h-10 rounded-full"
                              />
                              {result.username}
                              <button
                                type="button"
                                className="bg-gradient-to-r from-green-600 to-green-300 rounded-md text-white    h-6 hover:cursor-pointer ml-10 mb-10 px-1"
                                value={result.username}
                                onClick={addFriend}
                              >
                                Add Friend
                              </button>
                            </p>
                          </li>
                        ) : null
                      )}
                    </ul>
                  ) : results.length === 0 && !close ? (
                    <p className="text-white ml-14 w-fit">No results found.</p>
                  ) : null}
                </div>
              }
            </div>
          </form>

          <div className="ml-14">
            <div className="flex flex-wrap">
              {friends.map((friend) => {
                return (
                  <FriendsCard
                    data={{
                      friend: friend,
                      friends: true,
                    }}
                  />
                )
              })}
            </div>
          </div>
        </div>

        <div className="col-span-1" style={{ backgroundColor: '#141349' }}>
          <h1 className=" text-lg font-medium text-white ml-6 w-fit mt-8 font-sans">
            Friend Requests({requests.length})
          </h1>

          {requests.map((request) => {
            console.log(request)

            return (
              <div className=" w-fit">
                <img
                  src={request.profilePic}
                  className="w-10 h-10 rounded-full inline m-6 mr-2   "
                />
                <a className="text-white text-base font-medium w-12">
                  {request.username}
                </a>
                {request.requester === false ? (
                  <div className="w-fit inline">
                    <button
                      onClick={acceptRequest}
                      data-username={request.username}
                    >
                      <img src={tick} className="inline  h-8  w-min ml-10" />
                    </button>
                    <button
                      data-username={request.username}
                      onClick={rejectRequest}
                    >
                      <img src={cross} className="inline  h-8  w-min ml-2" />
                    </button>
                  </div>
                ) : (
                  <a className="mt-4 text-white ml-24">Pending</a>
                )}{' '}
              </div>
            )
          })}
        </div>
      </div>

      {/* 
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
       */}
    </>
  )
}

export default Social
