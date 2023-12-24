import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AddTask = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    deadline: '',
  })

  const [formErrors, setFormErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const navigate = useNavigate()

  const handleChange = (evt) => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
    })
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    ////console.log(formData);
    setFormErrors(validate(formData))
    setSubmitted(true)
  }

  useEffect(() => {
    if(Object.keys(formErrors).length === 0 && submitted) {

    const fetchData = async () => {
      let response
      const url = 'https://task-manager-3o0h.onrender.com/tasks/add'
      const token = localStorage.getItem('token')
      try {
        response = await axios.post(url, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
        //console.log(response)

        setFormData({
          title: '',
          description: '',
          deadline: '',
        })
      } catch (err) {
        //console.log(err)
      }

      if (response) {
        navigate('/tasks');
      }
    }
    fetchData()
  }}, [formErrors])

  const validate = (values) => {
    let errors = {}

    if (!values.title) {
      errors.title = 'Title is required'
    } else if (values.title.length < 5) {
      errors.title = 'Title must be at least 5 characters'
    }

    if (!values.description) {
      errors.description = 'Description is required'
    } else if (values.description.length < 10) {
      errors.description = 'Description must be at least 10 characters'
    }

    if (!values.deadline) {
      errors.deadline = 'Deadline is required'
    } else if (new Date(values.deadline) < new Date( Date.now())) {
      errors.deadline = 'Deadline must be in the future'
    }

    
    return errors
  }
  

  return (
    <div className="flex h-screen items-center justify-center">
      <div
        className=" h-2/3 w-2/3 mx-auto"
        style={{ boxShadow: '0px 4px 24px 0px rgba(0, 0, 0, 0.15)' }}
      >
        <div className="mt-8 ml-10 w-fit">
          <a
            className=" text-4xl font-sans font-medium "
            style={{ color: '#232360' }}
          >
            Create
          </a>
          <a
            className=" text-4xl font-sans font-medium ml-4 "
            style={{ color: '#259875' }}
          >
            Task
          </a>
        </div>
        <div className="w-full mt-8 flex flex-col justify-around items-center h-3/5">
          <input
            type="text"
            className=" w-5/6 h-14 text-2xl font-sans font-semibold pl-4 placeholder-current"
            style={{
              borderRadius: '7px',
              backgroundColor: '#D9D9D9',
              color: '#259875',
            }}
            placeholder="Title"
            onChange={handleChange}
            name="title"
            value={formData.title}
          />
          <div className="text-red-500 text-sm">
            {formErrors.title && submitted && formErrors.title}
          </div>
          <textarea
            type="text"
            className=" w-5/6 h-14 text-2xl font-sans font-semibold pl-4 placeholder-current "
            style={{
              borderRadius: '7px',
              backgroundColor: '#D9D9D9',
              color: '#232360',
              paddingTop: '0.7rem',
            }}

            placeholder="Description"
            onChange={handleChange}
            name="description"
            value={formData.description}
          />
          <div className="text-red-500 text-sm">
            {formErrors.description && submitted && formErrors.description}
          </div>

          <input
            type="date"
            className=" w-5/6 h-14 text-2xl font-sans font-semibold pl-4 placeholder-current"
            style={{
              borderRadius: '7px',
              backgroundColor: '#D9D9D9',
              color: '#259875',
            }}
            placeholder="Deadline"
            onChange={handleChange}
            name="deadline"
            value={formData.deadline}
          />
          <div className="text-red-500 text-sm">
            {formErrors.deadline && submitted && formErrors.deadline}
            </div>
        </div>
        <div className="w-full mt-4 flex justify-around items-center mb-8">
          <button
            className=" w-60 h-14 text-2xl font-sans font-semibold rounded-md"
            style={{ backgroundColor: '#2CB98F', color: '#232360' }}
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddTask

{
  /* <div className=' h-screen min-h-full'>

           <button className=' w-60 h-14 text-2xl font-sans font-semibold rounded-md' style={{backgroundColor:'#2CB98F',color:'#232360'}}>Add Member</button>
            <div className=" w-2/3 h-2/3  rounded-xl shadow-2xl mx-auto mt-16  "   >
                <div className='mt-8'><a >CREATE</a><a >TASK</a>

                </div>
            
                    <form className=" mt-10">
                    <div >
                
                        <input type="text" placeholder="Title" name="title" onChange={handleChange} className=" border-slate-800 border-2  rounded-md hover:bg-slate-100 h-8"/>
                    </div>
                    <div className="mt-6">
                
                
                
                        <textarea type="text" placeholder="Description" name="description" rows="3" onChange={handleChange} className=" border-slate-800 border-2  rounded-md hover:bg-slate-100 w-50 "/>
                    </div>

                    <div className="mt-6">
                        <label className="block">Deadline</label>
                        <input type="date" placeholder="Deadline" name="deadline" onChange={handleChange}  className=" border-slate-800 border-2  rounded-md hover:bg-slate-100 h-8"/>
                    </div>

                    <div className="mt-6 ml-8">
                        <button className="bg-gradient-to-r from-green-600 to-green-300 rounded-md text-white font-bold text-lg w-28 h-10 hover:cursor-pointer" onClick={handleSubmit} >Add Task</button>
                    </div>
                    </form>
            </div>

    </div>*/
}
