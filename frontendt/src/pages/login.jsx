import React, {useState} from "react";
import Img from  '../images/SignupPage.jpg';
import axios from "axios";
import {useNavigate} from "react-router-dom";


function Login(){

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        
        password: ""
    });

    const handleChange = (evt) => {
        
        setFormData({
            ...formData, [evt.target.name]: evt.target.value
    })
};

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        //console.log(formData);

        let response;
        const url= "http://localhost:8080/login";
        try{
            response = await axios.post(url, formData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log(response);

            setFormData({
                username: "",
                
                password: ""
            });

        }
        catch(err){
            console.log(err);
        }

        if(response){

        localStorage.setItem("username", formData.username);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("isAuthenticated", true);
        navigate("/");
        
    }
    }
    return(
        <div className="flex " >
        <img src={Img}  className="w-2/4 h-screen"/>
        <div className=" mr-auto ml-auto  w-96" >
            <div className=" pt-44"  >
            <h1 className=" font-extrabold text-2xl w-46">Start Grinding</h1>
            <h1 className=" font-bold text-lg mt-10">Log In</h1>
            <form className=" mt-10">
                <div >
                
                <input type="text" placeholder="Username" name="username" value={formData.username} onChange={handleChange} className=" border-slate-800 border-2 ml-6 rounded-md hover:bg-slate-100 h-8"/>
                </div>
                <div className="mt-6">
                
                
                
                <input type="password" placeholder="Password" name="password" value={formData.password }  onChange={handleChange} className=" border-slate-800 border-2 ml-6 rounded-md hover:bg-slate-100 h-8"/>
                </div>

                <div className="mt-6 ml-8">
                <button className="bg-gradient-to-r from-green-600 to-green-300 rounded-md text-white font-bold text-lg w-28 h-10 hover:cursor-pointer" onClick={handleSubmit}>Log In</button>
                </div>
            </form>
            </div>
        </div>
        </div>
    )
}

export default Login;