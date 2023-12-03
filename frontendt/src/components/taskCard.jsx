import React from 'react';


const TaskCard = (props) => {

    const {task} = props;
    const dateWithoutTime = task.deadline.split("T")[0];



    


    return(
        <>
        <div className=" mx-auto bg-gradient-to-r from-white to-slate-200 shadow-lg rounded-md overflow-hidden w-9/12  mt-24 ">

            <h1 className="text-left pl-12 font-extrabold text-2xl">{task.title}</h1>
            <p className="text-lg text-left pl-16 font-medium">{task.description}</p>
            <p className=" text-right pr-12 font-medium ">{dateWithoutTime}</p>

  
  
</div>

        </>
    )
    }

export default TaskCard;