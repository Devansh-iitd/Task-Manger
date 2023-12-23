import React, { useState } from 'react'
import Img from '../images/LoginImg.svg'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

function Login() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: '',

    password: '',
  })

  const [formErrors, setFormErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (evt) => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
    })
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    //console.log(formData);
    setFormErrors(validate(formData))
    setIsSubmitting(true)
  }

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmitting) {
      const fetchData = async () => {
        let response
        const url = 'http://localhost:8080/login'
        try {
          response = await axios.post(url, formData, {
            headers: {
              'Content-Type': 'application/json',
            },
          })
          //console.log(response);

          setFormData({
            username: '',
            password: '',
          }
          
          )
          setError(null);
        } catch (err) {
          console.log(err);
          if(err.response.status === 401){
            setError('Invalid Credentials')
          }
          else{
            setError('Something went wrong')
          }
          setFormData({
            username: '',
            password: '',
          })
        }

        if (response) {
          localStorage.setItem('username', formData.username)
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('isAuthenticated', true)
          setTimeout(() => {
            localStorage.removeItem('username')
            localStorage.removeItem('token')
            localStorage.removeItem('isAuthenticated')
            localStorage.removeItem('profilePic')
            navigate('/login')
          }, 3600000)

          try {
            response = await axios.get(
              'http://localhost:8080/userInfo/profilePic',
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
                  'Content-Type': 'application/json',
                },
              }
            )
            //console.log(response);
            localStorage.setItem('profilePic', response.data.profilePic)
          } catch (err) {
            console.log(err)
          }

          navigate('/')
        }
      }
      fetchData()
    }
    
  }, [formErrors])

  const validate = (values) => {
    const error = {}
    if (!values.username) {
      error.username = 'Username is required'
    }
    if (!values.password) {
      error.password = 'Password is required'
    }
    return error
  }

  return (
    <div className=" bg-white w-full ">
        
       {error && <div className=' w-52 h-14 bg-red-400 bg-opacity-40 ml-56 p-2 mt-8 rounded-md  '>
            {error && <div className="text-red-500 text-center text-base font-medium">{error}</div>}
        </div>}
      <div className=" w-2/3 h-max  shadow-2xl  grid grid-cols-2 mx-auto mt-16 ">
        <div className=" col-span-1">
          <div className="flex justify-around mt-9 ">
            <h1 className=" font-bold text-lg">
              <a style={{ color: '#259875' }}>Task</a>
              <a style={{ color: '#141349' }}>Hub</a>
            </h1>
            <div className="flex justify-around w-48">
              <h1
                className=" font-bold text-lg cursor-pointer"
                style={{ color: '#141349' }}
              >
                Login
              </h1>
              <h1
                className="font-semibold text-lg cursor-pointer"
                style={{ color: '#259875' }}
                onClick={() => {
                  navigate('/signup')
                }}
              >
                Sign Up
              </h1>
            </div>
          </div>
          <div className=" text-3xl font-medium mt-28 w-max ml-14">SIGN IN</div>
          <p
            className="w-max font-medium text-lg ml-14 mt-3"
            style={{ color: '#8E8989' }}
          >
            Sign in to continue to our application{' '}
          </p>
          <form className="mt-7">
            <div className="w-max ml-14">
              <input
                type="text"
                placeholder="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className=" border-x-0 border-t-0 border-b-2 border-black pb-3 font-medium"
                style={{ width: '376px' }}
              />
              <p className="text-red-500 text-sm">{formErrors.username}</p>
            </div>
            <div className="w-max ml-14 mt-6">
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="border-x-0 border-t-0 border-b-2 border-black pb-3 font-medium"
                style={{ width: '376px' }}
              />
              <p className="text-red-500 text-sm">{formErrors.password}</p>
            </div>

            <div className="w-max">
              <button
                className="mt-8 text-white h-11 mb-24 rounded-lg  shadow-2xl text-lg  font-medium ml-12 "
                style={{
                  width: '376px',
                  background:
                    'linear-gradient(269deg, rgba(50, 160, 120, 0.36) 0%, #2624A3 0%, #259875 100%)',
                  boxShadow: '0px 10px 20px 0px #1B1A60',
                }}
                onClick={handleSubmit}
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
        <div
          className="col-span-1 "
          style={{
            background:
              'linear-gradient(180deg, #141349 19.37%, rgba(50, 160, 120, 0.36) 100%)',
          }}
        >
          <img src={Img} className="mx-auto mt-20" />
        </div>
      </div>
    </div>
  )
}

export default Login
