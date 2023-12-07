import React from 'react';


const TaskCard = (props) => {

    const {task} = props.data;
    const dateWithoutTime = task.deadline.split("T")[0];
    const {TaskDetails} = props.data;
    



    


    return(
        <>
        <div className=" mx-auto bg-gradient-to-r from-white to-slate-200 shadow-lg rounded-md overflow-hidden w-9/12  mt-24 ">

            <div className='flex w-full'>
                <div className='w-full'>
            <h1 className="text-left pl-12 font-extrabold text-2xl">{task.title}</h1>
            <p className="text-lg text-left pl-16 font-medium w-9/12">{task.description}</p>
            </div>
            <button type="button" className="bg-gradient-to-r from-green-600 to-green-300 rounded-md text-white    h-6 hover:cursor-pointer ml-auto mb-4 m-5 mr-20 px-2" value={task.id} onClick={TaskDetails}>Details</button>
            </div>

            <p className=" text-right pr-12 font-medium ">{dateWithoutTime}</p>

  
  
</div>

        </>
    )
    }

export default TaskCard;