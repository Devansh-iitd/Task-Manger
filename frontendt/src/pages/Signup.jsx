import React, {useState} from "react";
import Img from  '../images/SignupPage.svg';
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
            localStorage.removeItem("profilePic");
            navigate("/login");

        }, 3600000);

        try{
            response = await axios.get('http://localhost:8080/userInfo/profilePic',{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                }
            });
            
            localStorage.setItem("profilePic", response.data.profilePic);
        }
        catch(err){
            console.log(err);
        }

        navigate("/");
        }

        






    }

    return(
       

    <div className=" bg-white w-full " >
    <div className=" w-2/3   shadow-2xl  grid grid-cols-2 mx-auto mt-16 ">

    <div className="col-span-1 " style={{background: 'linear-gradient(180deg, #141349 19.37%, rgba(50, 160, 120, 0.36) 100%)'}}>
            <img src={Img} className="mx-auto mt-20" />
        </div>


        <div className=" col-span-1">
        <div className="flex justify-around mt-9 ">
            <h1 className=" font-bold text-lg"><a style={{color:'#259875'}}>Task</a><a style={{color:'#141349'}}>Hub</a></h1>
            <div className="flex justify-around w-48">
                <h1 className=" font-bold text-lg cursor-pointer" style={{color:'#141349'}}>Login</h1>
                <h1 className="font-semibold text-lg cursor-pointer" style={{color:'#259875'}} onClick={() => {
                    navigate("/signup");
                
                }}>Sign Up</h1>
            </div>
        </div>
        <div className=" text-3xl font-medium mt-28 w-max ml-14">SIGN UP</div>
        <p className="w-max font-medium text-lg ml-14 mt-3" style={{color:'#8E8989'}}>Sign up to continue to our application </p>
        <form className="mt-7" >

        <div className="w-max ml-14" >
        
        <input type="text" placeholder="Username" name="username" value={formData.username} onChange={handleChange} className=" border-x-0 border-t-0 border-b-2 border-black pb-3 font-medium" style={{width:'376px'}}/>
        </div>
        <div className="w-max ml-14 mt-6">

        <input type="text" placeholder="Email Id" name="email" value={formData.email} onChange={handleChange} className=" border-x-0 border-t-0 border-b-2 border-black pb-3 font-medium " style={{width:'376px'}}/>
        </div>

        <div className="w-max ml-14 mt-6">
        
        
        
        <input type="password" placeholder="Password" name="password" value={formData.password }  onChange={handleChange} className="border-x-0 border-t-0 border-b-2 border-black pb-3 font-medium" style={{width:'376px'}}/>
        </div>

        <div className="w-max">
        <button className="mt-8 text-white h-11 mb-16 rounded-lg  shadow-2xl text-lg  font-medium ml-12 " style={{width:'376px',background:'linear-gradient(269deg, rgba(50, 160, 120, 0.36) 0%, #2624A3 0%, #259875 100%)',boxShadow:'0px 10px 20px 0px #1B1A60'}} onClick={handleSubmit}>Sign In</button>
</div>
        </form>

        
        </div>
       

    </div>

{/*<div className="flex " >
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
    </div>*/}





</div>



 

    )
}

export default Signup;