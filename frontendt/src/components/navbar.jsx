import React from 'react'
import { useNavigate } from 'react-router-dom'

const Nav = () => {
  const navigate = useNavigate()
  const HandleLogin = () => {
    navigate('/login')
  }
  const HandleSignup = () => {
    navigate('/signup')
  }

  const HandleLogOut = () => {
    localStorage.removeItem('username')
    localStorage.removeItem('token')
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('profilePic')

    navigate('/login')
  }

  const goHome = () => {
    navigate('/')
  }

  const Tasks = () => {
    navigate('/tasks')
  }

  const Social = () => {
    navigate('/social')
  }

  return (
    <>
      <div className=" bg-gradient-to-r from-purple-300 to-purple-600 flex  flex-row justify-between pt-2 pb-2 sticky top-0">
        <h1
          className=" font-bold text-gradient-to-r from-green-600 to-green-300 text-3xl ml-10 hover:cursor-pointer  "
          onClick={goHome}
        >
          TaskHub
        </h1>
        <div className="flex justify-around w-96 mr-16">
          {localStorage.getItem('isAuthenticated') ? (
            <>
              <button
                className=" text-md bg-pink-500 font-semibold rounded-full pt-2 pb-2 hover:bg-pink-700 pl-6 pr-6"
                onClick={HandleLogOut}
              >
                Log Out
              </button>

              <button
                className=" text-md bg-green-400 font-semibold rounded-full pt-2 pb-2 hover:bg-green-700 pl-6 pr-6"
                onClick={Tasks}
              >
                Tasks
              </button>
              <button
                className=" text-md bg-green-400 font-semibold rounded-full pt-2 pb-2 hover:bg-green-700 pl-6 pr-6"
                onClick={Social}
              >
                Social
              </button>
              <img
                className=" rounded-full h-10 w-10"
                src={localStorage.getItem('profilePic')}
                alt="profilePic"
              />
            </>
          ) : (
            <>
              <button
                className=" text-md bg-pink-500 font-bold rounded-full pt-2 pb-2 hover:bg-pink-700 pl-6 pr-6"
                onClick={HandleLogin}
              >
                Log In
              </button>
              <button
                className="text-md bg-green-400 font-bold rounded-full pt-2 pb-2 hover:bg-green-700 pl-6 pr-6"
                onClick={HandleSignup}
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default Nav
