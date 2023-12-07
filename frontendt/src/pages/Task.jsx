import React from 'react';
import { useEffect,useState } from 'react';
import axios from 'axios';



const Task = () => {
    const id = window.location.href.split("/")[4];
    const [task, setTask] = useState({});
    const [members, setMembers] = useState([]);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    useEffect( () => {
        const fetchData = async () => {
            const url = `http://localhost:8080/tasks/${id}`;
            const token = localStorage.getItem("token");
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                params : {
                    id : id
                },
            })
            console.log(response.data);
            response.data.deadline = response.data.deadline.split("T")[0];
            setTask(response.data);

        
            
        }
        fetchData();
    },[]);

    

    


return (
    <>
    
    <div className='flex'>
        <div className="w-9/12">
           
            <div className='mt-44 m-16 bg-slate-200 shadow-lg rounded-md overflow-hidden pt-8 pb-8'>
            <h1 className="text-3xl font-bold">{task.title}</h1>
                <p className="text-xl font-semibold m-3">Description</p>
                <p className="text-xl m-3">{task.description}</p>
                <p className="text-xl font-semibold m-3">Deadline</p>
                <p className="text-xl m-3">{task.deadline}</p>
                <p className="text-xl font-semibold m-3">Progress</p>
                <div className='flex items-center justify-center'>
                    <progress className="w-1/2 m-3" value={task.progress} max="100"></progress>
                    <p className="text-xl m-3">{task.progress}%</p>
                </div>
                <div >
                    <p className="text-xl m-3">Members</p>
                    <ul className="text-xl m-3">
                        {task.members?.map((member) => {
                            return <li>{member}</li>
                        })}
                    </ul>
                    <button type='button' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={() => {setIsSearchOpen(true)}}> Add Member</button>
                </div>
                
            </div>
        </div>
    </div>
    </>
)
    
    }

export default Task;