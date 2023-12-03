import React from 'react';
import TaskCard from '../components/taskCard';
import axios from 'axios';
import { useEffect,useState } from 'react';


const Tasks = () => {

    const [tasks, setTasks] = useState([]);

    useEffect(() => {

         const fetchData = async () => {
            const url = "http://localhost:8080/tasks";
            const token = localStorage.getItem("token");
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            })

            console.log(response.data);
            setTasks(response.data);
           
            
            
         }
         

            fetchData();
            console.log("hello");
             
        
        }, []);

    const ChangePage = () => {
        window.location.href = "/tasks/addTask";
        
    }

        
    

    
        


    return (
        <>
        <h1 className=" text-left pl-10 pb-6 text-white bg-gradient-to-r from-purple-300 to-purple-600 text-3xl font-bold ">Your Tasks</h1>
        <button className="bg-gradient-to-r from-green-600 to-green-300 rounded-md text-white font-bold text-lg w-28 h-10 hover:cursor-pointer ml-10 mb-10" onClick={ChangePage}>Add Task</button>
        <div className='container'>

           { tasks.map((task) => {
               return <TaskCard task={task} />
           })}
            </div>
        </>
    )
}

export default Tasks;