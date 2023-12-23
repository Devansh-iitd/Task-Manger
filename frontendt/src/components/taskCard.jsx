import React from 'react'
import dots from '../images/Twodots.svg'

const TaskCard = (props) => {
  const { task } = props.data

  const { TaskDetails } = props.data
  const dateString = new Date(task.deadline)
  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  const date = dateString.toLocaleString('en-US', options)
  const progress = task.progress.toFixed(2)

  const profilePics = task.profilePics
  //console.log(profilePics);
  const daysLeft = Math.ceil(
    (new Date(task.deadline) - new Date()) / (1000 * 60 * 60 * 24)
  )
  let backgroundColor
  if (progress < 30 || daysLeft < 0) {
    backgroundColor = '#FDD'
  } else if (progress > 60) {
    backgroundColor = '#D2FFD4'
  } else {
    backgroundColor = '#FFE2B6'
  }

  let c = 0

  return (
    <>
      <div
        className=" w-80 h-72 bg-white m-4 "
        style={{ borderRadius: '35px' }}
        onClick={TaskDetails}
        data-id={task.id}
      >
        <div
          className=" bg-opacity-50 w-full h-full"
          style={{
            borderRadius: '35px',
            backgroundColor: `${backgroundColor}`,
          }}
        >
          <div className=" flex justify-between">
            <p className="ml-4 w-fit text-xs text-gray-500 font-medium m-4">
              {date}
            </p>
            <a>
              <img src={dots} className=" mr-8 mt-4" />
            </a>
          </div>
          <h1 className=" font-semibold text-3xl text-black font-sans mx-auto mt-10">
            {task.title}
          </h1>
          <div>
            <p className=" text-xl font-semibold font-sans w-fit ml-3 mt-4">
              Progress
            </p>
            <div className="h-3 w-5/6  bg-slate-400 mt-4 rounded-full ml-3">
              <div
                className=" h-full bg-green-700 rounded-full "
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className=" text-xl font-semibold font-sans w-fit ml-60 mt-4">
              {progress}%
            </p>
          </div>
          <div className="w-full flex justify-between">
            <div className="w-fit ml-4">
              {profilePics.map((profilePic) => {
                c++
                if (c > 3) {
                  return
                }

                return (
                  <img
                    src={profilePic}
                    className="w-10 h-10 rounded-full inline -mx-1   "
                  />
                )
              })}
              {c > 3 ? (
                <a className="text-xl font-semibold font-sans w-fit  mt-4">
                  +{profilePics.length - 3}
                </a>
              ) : null}
            </div>
            {daysLeft > 0 ? (
              <a
                className=" mr-6  text-sm font-medium text-black h-8 rounded-full my-auto inline pt-1 px-3 bg-opacity-60  "
                style={{ backgroundColor: `${backgroundColor}` }}
              >
                {daysLeft} {daysLeft > 1 ? <a>Days</a> : <a>Day</a>} Left
              </a>
            ) : (
              <a className=" mr-6  text-sm font-medium text-black bg-red-500 h-8 rounded-full my-auto inline pt-1 px-3 bg-opacity-60  ">
                Deadline Passed
              </a>
            )}
          </div>
        </div>
      </div>

      {/* <div className=" mx-auto bg-gradient-to-r from-white to-slate-200 shadow-lg rounded-md overflow-hidden w-9/12  mt-24 ">

                <div className='flex w-full'>
                    <div className='w-full'>
                        <h1 className="text-left pl-12 font-extrabold text-2xl">{task.title}</h1>
                        <p className="text-lg text-left pl-16 font-medium w-9/12">{task.description}</p>
                    </div>
                    <button type="button" className="bg-gradient-to-r from-green-600 to-green-300 rounded-md text-white    h-6 hover:cursor-pointer ml-auto mb-4 m-5 mr-20 px-2" onClick={TaskDetails}>Details</button>
                </div>

                <p className=" text-right pr-12 font-medium ">{dateWithoutTime}</p>

  
  
    </div>*/}
    </>
  )
}

export default TaskCard
