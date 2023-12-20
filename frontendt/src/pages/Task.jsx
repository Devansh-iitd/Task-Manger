import React from 'react';
import { useEffect,useState } from 'react';
import axios from 'axios';
import ReactModal from 'react-modal';
import SearchBar from '../components/SearchBar';

 




const Task = () => {
    const id = window.location.href.split("/")[4];
    const [task, setTask] = useState({});
    
    const [ModalisOpen, setModalisOpen] = useState(false);
    const [username, setUsername] = useState("");
    
    

    useEffect( () => {
        const fetchData = async () => {
            const url = `http://localhost:8080/tasks/${id}`;
            const token = localStorage.getItem("token");
            try{
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
        catch(err){
            console.log(err);
            if(err.response.data==='SuperTask does not exist'){
                handleDelete();
            }
               

        }

        
            
        }
        fetchData();
    },[ModalisOpen]);

    const OpenModal = () => {
        
        setModalisOpen(true);
    }


    const CloseModal = () => {
    
        setModalisOpen(false);

    }

    const [results, setResults] = useState([]);
    const [formData, setFormData] = useState({
        username: "",
        title: "",
        description: "",
        deadline: "",
    });

    
    

    const handleChange = (evt) => {
        setFormData({
            ...formData, [evt.target.name]: evt.target.value
    })

   
    console.log(formData);

};

const [close, setClose] = useState(false);

const handlechange1 = (evt) => {
    console.log(evt.currentTarget.getAttribute("data-username"));
    setUsername(evt.currentTarget.getAttribute("data-username"));
    setFormData({
        ...formData, username: evt.currentTarget.getAttribute("data-username")
})
console.log(formData);
    setClose(true);
//console.log(formData);
};

const handleSubmit = async (evt) => {

    evt.preventDefault();
    console.log(formData);
    const id = window.location.href.split("/")[4];
    const url = `http://localhost:8080/tasks/addmember/${id}`;
    const token = localStorage.getItem("token");
    try {
        const response = await axios.put(url, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            params : {
                id : id
            }
        });
        //console.log(response);
    
        CloseModal();
       // window.location.href = `/tasks/${id}`;
    
    }
    catch(err){
        console.log(err);
    }

}

const handleUpdate = async (evt) => {
    evt.preventDefault();

    const id = window.location.href.split("/")[4];
    const url = `http://localhost:8080/tasks/update/${id}`;
    const token = localStorage.getItem("token");
    
    try{
    
        const response = await axios.put(url, {status:'completed'},{
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            params : {
                id : id
            }
        })
        console.log(response);
        setTask((prev) => {
            return {...prev, progress:response.data};
        })

        
    }
    catch(err){
        console.log(err);
    }
}

const handleDelete = async (evt) => {
    //console.log('came here');
    
    const id = window.location.href.split("/")[4];
    try{
    const response = await axios.delete(`http://localhost:8080/tasks/delete/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
        params : {
            id : id
        }
    });
    console.log(response);
    

}
catch(err){
    console.log(err);

}
//window.location.href = '/tasks';
}

    

    

    


return (
    <>
    
    <div className='flex'>
        <div className="w-9/12">
        {(task.superTask==null?<button type='button' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={handleDelete} >Delete Task</button>
           :null)}
        
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
                            console.log(member);
                            return <li><a>{member.username}</a><a>{member.username === localStorage.getItem('username')?<button className='bg-green-400 ml-20' onClick={handleUpdate}>Completed</button>:null}</a> <a></a></li>
                        })}
                    </ul>
                    <button type='button' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={OpenModal}> Add Member</button>
                    <ReactModal isOpen={ModalisOpen} onRequestClose={CloseModal} className=" w-2/5 h-4/5 mx-auto mt-20 bg-slate-200 shadow-2xl opacity-100 overflow-y-scroll">
                        <h1 className="text-3xl font-bold m-12">Add Member</h1>
                        <form className=' flex justify-around'>
                            
                        
                                    <div>
                            <input type="test" className="border h-12 shadow p-4 rounded-full block  " placeholder="Username" onChange={handleChange} name='username' value={username} />

                            <input type="test" className="border h-12 shadow p-4 rounded-full block mt-8 " placeholder="Task Title" onChange={handleChange} name='title' />

                            <textarea className="border h-20 shadow p-4 rounded-md block my-auto mt-8 " placeholder="Task Description" onChange={handleChange} name='description' />

                            <input type="date" className="border h-12 shadow p-4 rounded-full   mt-8 mb-8 " placeholder="Deadline" onChange={handleChange} name='deadline' />

                            <button type="button" className="bg-gradient-to-r from-green-600 to-green-300  text-white    h-12 hover:cursor-pointer ml-10 mb-10 p-3 rounded-full" onClick={handleSubmit} >Add Member</button>   
                            </div>


                            <div>
                            <SearchBar data={
                                {
                                    setResults: setResults,
                                    name: "userSearch",
                                    placeholder: "Search Username",
                                    setClose: setClose,
                        
                                }
                            }
                            
                             />

                            

                            <div className="my-4 ">
                                {results.length > 0 && !close ? (
                                    <ul className="divide-y divide-gray-200">
                                        {results.map((result, index) => (
                                            

                                            <li key={index} className="py-4">
                                                <p  className="text-lg font-semibold pl-5" onClick={   handlechange1 } data-username={result.username} >
                                                    <img src={result.profilePic} className="w-10 h-10 rounded-full"/>
                                                    {result.username}

                                                   {/* <button type="button" className="bg-gradient-to-r from-green-600 to-green-300 rounded-md text-white    h-6 hover:cursor-pointer ml-10 mb-10 px-1" value={result.username} >Add Friend</button>*/}
                                                </p>
                                            </li>
                                        
                                        
                                        ))}
                                    </ul>
                                ) : (
                                    (results.length === 0 && !close)?
                                    <p className="text-gray-500">No results found.</p>
                                    : null
                                )}
                            </div>
                            </div>

                        </form>
                    </ReactModal>
                </div>
                
            </div>
        </div>
    </div>
    </>
)
    
    }

export default Task;