import React from 'react'
import TaskCard from '../components/taskCard'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { hideMessage } from '../redux/slices/flashMessage'
import { useNavigate } from 'react-router-dom'

const Tasks = () => {
  const [tasks, setTasks] = useState([])
  const message = useSelector((state) => state.flashMessage.message)
  const visibility = useSelector((state) => state.flashMessage.isVisible)
  //console.log(message,visibility);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    //console.log('use effect');
    const fetchData = async () => {
      const url = 'http://localhost:8080/tasks'
      const token = localStorage.getItem('token')
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      ////console.log(response.data);
      setTasks(response.data)
    }

    fetchData()
    ////console.log("hello");
  }, [])

  const ChangePage = () => {
    navigate('/tasks/addTask')
  }

  const TaskDetails = (evt) => {
    const id = evt.currentTarget.getAttribute('data-id')

    navigate(`/tasks/${id}`)
  }

  if(visibility){
    //console.log('came here');
    setTimeout( () => {
      dispatch(hideMessage())
    },3000)
  }

  return (
    <div
      style={{ height: '100%', backgroundColor: '#259875' }}
      className=" min-h-screen"
    >
      {visibility && <div class="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 " role="alert">
  <p>{message}</p>
</div>}
      

      <button
        className="bg-gradient-to-r from-green-600 to-green-300 rounded-md text-white font-bold text-lg w-28 h-10 hover:cursor-pointer ml-10 mb-10"
        onClick={ChangePage}
      >
        Add Task
      </button>
      <div className="flex justify-around flex-wrap">
        {tasks.map((task) => {
          return (
            <TaskCard
              data={{
                task: task,
                TaskDetails: TaskDetails,
              }}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Tasks
