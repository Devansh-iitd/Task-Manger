import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import ReactModal from 'react-modal'
import SearchBar from '../components/SearchBar'
import {  useDispatch } from 'react-redux'
import { showMessage } from '../redux/slices/flashMessage'
import { useNavigate } from 'react-router-dom'

const Task = () => {
  const id = window.location.href.split('/')[4]
  const [task, setTask] = useState({})
  const navigate = useNavigate()

  const [ModalisOpen, setModalisOpen] = useState(false)
 // const [username, setUsername] = useState('')
  const [superTask, setSuperTask] = useState(true)
  const dispatch = useDispatch()
  // const [messsage, setMesssage] = useState(useSelector((state) => state.flashMessage.message));
  //const message = useSelector((state) => state.flashMessage.message)
  //const visibility = useSelector((state) => state.flashMessage.isVisible)
  const [error,setError]  = useState('');
  //console.log(visibility)
  

  useEffect(() => {
    //console.log('use effect');
    const fetchData = async () => {
      const url = `http://localhost:8080/tasks/${id}`
      const token = localStorage.getItem('token')
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          params: {
            id: id,
          },
        })
        ////console.log(response.data)
        response.data.deadline = response.data.deadline.split('T')[0]
        setTask(response.data)
      } catch (err) {
        //console.log(err)
        if (err.response.data === 'SuperTask does not exist') {
          setSuperTask(false)
          //console.log(superTask)
          handleDelete()
          //dispatch(showMessage('SuperTask does not exist'))
        }
      }
    }
    fetchData()
  }, [ModalisOpen,superTask])

  const OpenModal = () => {
    setModalisOpen(true)
  }

  const CloseModal = () => {
    setError('')
    setModalisOpen(false)
  }

  const [results, setResults] = useState([])
  const [formData, setFormData] = useState({
    username: '',
    title: '',
    description: '',
    deadline: '',
  })

  const handleChange = (evt) => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
    })

    ////console.log(formData)
  }

  const [close, setClose] = useState(false)

  const handlechange1 = (evt) => {
    ////console.log(evt.currentTarget.getAttribute('data-username'))
    //setUsername(evt.currentTarget.getAttribute('data-username'))
    setFormData({
      ...formData,
      username: evt.currentTarget.getAttribute('data-username'),
    })
    ////console.log(formData)
    setClose(true)
    ////console.log(formData)
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    ////console.log(formData)
    
    const id = window.location.href.split('/')[4]
    const url = `http://localhost:8080/tasks/addmember/${id}`
    const token = localStorage.getItem('token')
    try {
       await axios.put(url, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        params: {
          id: id,
        },
      })
      //console.log(response);

      CloseModal()
      // window.location.href = `/tasks/${id}`;
    } catch (err) {
      //console.log(err)
      
      if(err.response.data === 'Member does not exist'){
        
      setError('Incorrect Username or User does not exist')
      }
      else if(err.response.data === 'Member already exists'){
        setError('Member already exists')
      }
    }
  }

  const handleUpdate = async (evt) => {
    evt.preventDefault()

    const id = window.location.href.split('/')[4]
    const url = `http://localhost:8080/tasks/update/${id}`
    const token = localStorage.getItem('token')

    try {
      const response = await axios.put(
        url,
        { status: 'completed' },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          params: {
            id: id,
          },
        }
      )
      //console.log(response)
      setTask((prev) => {
        return { ...prev, progress: response.data }
      })
    } catch (err) {
      //console.log(err)
    }
  }

  const handleDelete = async (evt) => {
    ////console.log('came here');

    const id = window.location.href.split('/')[4]
    try {
       await axios.delete(
        `http://localhost:8080/tasks/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
          params: {
            id: id,
          },
        }
      )
      //console.log(response)
    } catch (err) {
      //console.log(err)
    }
    navigate('/tasks')
    if (superTask === false) {
      dispatch(showMessage('SuperTask has been deleted'))
    }
    //console.log(message, 'hello', superTask)
  }

  

  const dateString = new Date(task.deadline)
  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  const date = dateString.toLocaleString('en-US', options)

  return (
    <>
      <div className="flex min-h-screen h-max items-center justify-center">
        <div
          className=" h-2/3 w-2/3 mx-auto p-12 pt-8"
          style={{ boxShadow: '0px 4px 24px 0px rgba(0, 0, 0, 0.15)' }}
        >
          <div className="flex justify-between">
            <div className="flex flex-col items-start">
              <div>
                <a
                  className=" text-3xl font-sans font-medium "
                  style={{ color: '#259875' }}
                >
                  Task
                </a>
                <a
                  className=" text-3xl font-sans font-medium ml-4 "
                  style={{ color: '#232360' }}
                >
                  Details
                </a>
              </div>
              <div
                className=" font-medium text-lg"
                style={{ color: 'rgba(0, 0, 0, 0.59)' }}
              >
                {date}
              </div>
            </div>
            <button
              className=" w-28 h-10 text-base font-medium rounded-md"
              style={{ backgroundColor: '#D9D9D9', color: '#232360' }}
            >
              Edit
            </button>
          </div>

          <h1 className="text-3xl font-bold">{task.title}</h1>
          <p className="text-xl font-semibold m-3">Description</p>
          <p className="text-xl m-3">{task.description}</p>
         {task.superTask!=null ?  <p className="text-xl font-semibold m-3">Assigned By: {task.assignedBy}</p>: null}
          <p className="text-xl font-semibold m-3">Deadline</p>
          <p className="text-xl m-3">{task.deadline}</p>
          <p className="text-xl font-semibold m-3">Progress</p>
          <div className="flex items-center justify-center">
            <progress
              className="w-1/2 m-3"
              value={task.progress}
              max="100"
            ></progress>
            <p className="text-xl m-3">{task.progress}%</p>
          </div>
          <div>
            <p className="text-xl m-3">Members</p>
            <ul className="text-xl m-3">
              {task.members?.map((member) => {
                ////console.log(member)
                return (
                  <li>
                    <a>{member.username}</a>
                  </li>
                )
              })}
            </ul>
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              className="py-2 px-7 rounded-md text-xl font-medium"
              style={{ backgroundColor: '#2CB98F', color: '#232360' }}
              onClick={OpenModal}
            >
              {' '}
              Add Member
            </button>
            <button
              className=" py-2 px-7 bg-blue-700 text-white rounded-full text-xl font-medium"
              onClick={handleUpdate}
            >
              Completed
            </button>
            {task.superTask == null ? (
              <button
                className=" py-2 px-7 rounded-md text-xl font-medium"
                style={{ backgroundColor: '#F44040', color: '#232360' }}
                onClick={handleDelete}
              >
                Delete Task
              </button>
            ) : null}
          </div>
          <ReactModal
            isOpen={ModalisOpen}
            onRequestClose={CloseModal}
            className=" w-2/5 h-4/5 mx-auto mt-20 bg-slate-200 shadow-2xl opacity-100 overflow-y-scroll"
          >
            <h1 className="text-3xl font-bold m-12">Add Member</h1>
            <form className=" flex justify-around">
              <div>
                <input
                  type="test"
                  className="border h-12 shadow p-4 rounded-full block  "
                  placeholder="Username"
                  onChange={handleChange}
                  name="username"
                  value={formData.username}
                />
                <p className="text-red-500">{error}</p>

                <input
                  type="test"
                  className="border h-12 shadow p-4 rounded-full block mt-8 "
                  placeholder="Task Title"
                  onChange={handleChange}
                  name="title"
                  value={formData.title}
                />

                <textarea
                  className="border h-20 shadow p-4 rounded-md block my-auto mt-8 "
                  placeholder="Task Description"
                  onChange={handleChange}
                  name="description"
                  value={formData.description}
                />

                <input
                  type="date"
                  className="border h-12 shadow p-4 rounded-full   mt-8 mb-8 "
                  placeholder="Deadline"
                  onChange={handleChange}
                  name="deadline"
                  value={formData.deadline}
                />

                <button
                  type="button"
                  className="bg-gradient-to-r from-green-600 to-green-300  text-white    h-12 hover:cursor-pointer ml-10 mb-10 p-3 rounded-full"
                  onClick={handleSubmit}
                >
                  Add Member
                </button>
              </div>

              <div>
                <SearchBar
                  data={{
                    setResults: setResults,
                    name: 'userSearch',
                    placeholder: 'Search Username',
                    setClose: setClose,
                    friends: true,
                  }}
                />

                <div className="my-4 ">
                  {results.length > 0 && !close ? (
                    <ul className="divide-y divide-gray-200">
                      {results.map((result, index) =>
                        result != null &&
                        result.username != localStorage.getItem('username') ? (
                          <li key={index} className="py-4">
                            <p
                              className="text-lg font-semibold pl-5"
                              onClick={handlechange1}
                              data-username={result.username}
                            >
                              <img
                                src={result.profilePic}
                                className="w-10 h-10 rounded-full"
                              />
                              {result.username}
                            </p>
                          </li>
                        ) : null
                      )}
                    </ul>
                  ) : results.length === 0 && !close ? (
                    <p className="text-gray-500">No results found.</p>
                  ) : null}
                </div>
              </div>
            </form>
          </ReactModal>
        </div>
      </div>
    </>
  )
}

export default Task

{
  /*
    <div className='flex'>
        <div className="w-9/12">
        {(task.superTask==null?<button type='button' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={handleDelete} >Delete Task</button>
           :null)}
        
            <div className='mt-44 m-16 bg-slate-200 shadow-lg rounded-md overflow-hidden pt-8 pb-8'>
            
                </div>
                
                
            </div>
        </div>
                                </div>*/
}
