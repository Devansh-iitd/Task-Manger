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

            //console.log(response.data);
            setTasks(response.data);
           
            
            
         }
         

            fetchData();
            //console.log("hello");
             
        
        }, []);

    const ChangePage = () => {
        window.location.href = "/tasks/addTask";
        
    }

    const TaskDetails = (evt) => {
        
        const id = evt.currentTarget.getAttribute("data-id");
        
        
        window.location.href = `/tasks/${id}`;
    }

        
    

    
        


    return (
        <div style={{ height:'100%',backgroundColor:'#259875'}} className=' min-h-screen'>
        
        <button className="bg-gradient-to-r from-green-600 to-green-300 rounded-md text-white font-bold text-lg w-28 h-10 hover:cursor-pointer ml-10 mb-10" onClick={ChangePage}>Add Task</button>
        <div className='flex justify-around flex-wrap' >

           { tasks.map((task) => {
               return <TaskCard data={{
                     task: task,
                     TaskDetails: TaskDetails
               }} />
           })}
            </div>
            
        </div>
    )
}

export default Tasks;