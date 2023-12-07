import React, {useState} from "react";
import Img from  '../images/SignupPage.jpg';
import {useNavigate} from "react-router-dom";
import axios from "axios";




function Signup(){

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });

    const handleChange = (evt) => {
        
        setFormData({
            ...formData, [evt.target.name]: evt.target.value
    })
};

    const url= "http://localhost:8080/register";

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        let response;
        
        try{
           // console.log(formData, baseURL);
         response= await axios.post(url, formData, {
            headers: {
                "Content-Type": "application/json",
            },
            
        
        });
        console.log(response);
    } catch (err) {
        console.log(err);
    }
        setFormData({
            username: "",
            email: "",
            password: ""
        });

        if(response){

        localStorage.setItem("username", formData.username);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("isAuthenticated", true);

        setTimeout(() => {
            localStorage.removeItem("username");
            localStorage.removeItem("token");
            localStorage.removeItem("isAuthenticated");
            navigate("/login");

        }, 3600000);

        navigate("/tasks");
        }

        else{
            console.log(response);
        }






    }

    return(
        <div className="flex " >
        <img src={Img}  className="w-2/4 h-screen"/>
        <div className=" mr-auto ml-auto  w-96" >
            <div className="mt-44 max-w-sm mx-auto bg-slate-200 shadow-lg rounded-md overflow-hidden p-8"  >
            <h1 className=" font-extrabold text-2xl w-46 px-6">Join TaskHub and Keep Track of Your Work</h1>
            <h1 className=" font-bold text-lg mt-10">Sign Up</h1>
            <form className=" mt-10">
                <div >
                
                <input type="text" placeholder="Username" name="username" value={formData.username} onChange={handleChange} className=" border-slate-800 border-2 ml-6 rounded-md hover:bg-slate-100 h-8"/>
                </div>
                <div className="mt-6">
                
                <input type="text" placeholder="Email" name="email" value={formData.email} onChange={handleChange} className=" border-slate-800 border-2 ml-6 rounded-md hover:bg-slate-100 h-8"/>
                </div>
                <div className="mt-6">
                
                <input type="password" placeholder="Password" name="password" value={formData.password }  onChange={handleChange} className=" border-slate-800 border-2 ml-6 rounded-md hover:bg-slate-100 h-8"/>
                </div>

                <div className="mt-6 ml-8">
                <button className="bg-gradient-to-r from-green-600 to-green-300 rounded-md text-white font-bold text-lg w-28 h-10 hover:cursor-pointer" onClick={handleSubmit}>Sign Up</button>
                </div>
            </form>
            </div>
        </div>
        </div>
    )
}

export default Signup;