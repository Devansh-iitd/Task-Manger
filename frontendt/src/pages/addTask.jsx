import React from 'react';
import { useState } from 'react';
import axios from 'axios';

const AddTask = () => {

    const [formData, setFormData] = useState({ 
        title: "",
        description: "",
        deadline: ""
    });

    const handleChange = (evt) => {
        setFormData({
            ...formData, [evt.target.name]: evt.target.value
    })};

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        //console.log(formData);

        let response;
        const url= "http://localhost:8080/tasks/add";
        const token = localStorage.getItem("token");
        try{
            response = await axios.post(url, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            console.log(response);

            setFormData({
                title: "",
                description: "",
                deadline: ""
            });

        }
        catch(err){
            console.log(err);
        }

        if(response){
            window.location.href = "/tasks";
        }
    }


    return(
        <>
        <div  >

           
            <div className=" mt-44 max-w-sm mx-auto bg-slate-200 shadow-lg rounded-md overflow-hidden pt-8 pb-8 "  >
            <h1 className=" font-extrabold text-2xl w-46">Add Task</h1>
            
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

        </div>
        </>
    )
}

export default AddTask;