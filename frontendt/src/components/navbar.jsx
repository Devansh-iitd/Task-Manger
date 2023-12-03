
import React from 'react';
import { useNavigate }  from 'react-router-dom';


const  Nav= () => {

  const navigate = useNavigate();
  const HandleLogin = () => {
    navigate('/login');
  }
  const HandleSignup = () => {
    navigate('/signup');
  }

  const HandleLogOut = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  }

  const goHome = () => {
    navigate('/');
  }

  const Tasks = () => {
    navigate('/tasks');
  }

  

  

  return (
   <>
   <div className=' bg-gradient-to-r from-purple-300 to-purple-600 flex  flex-row justify-between pt-2 pb-2 sticky top-0'>
    
    <icon className=" font-bold text-gradient-to-r from-green-600 to-green-300 text-3xl ml-10 hover:cursor-pointer  " onClick={goHome}>TaskHub</icon>
    <div className="flex justify-around w-80 mr-16" >

      {localStorage.getItem('isAuthenticated') ? (<><button className=' text-md bg-pink-500 font-bold rounded-full pt-2 pb-2 hover:bg-pink-700 pl-6 pr-6' onClick={HandleLogOut}>Log Out</button>
      
      <button className=' text-md bg-green-400 font-bold rounded-full pt-2 pb-2 hover:bg-green-700 pl-6 pr-6' onClick={Tasks}>Tasks</button>
      <button className=' text-md bg-green-400 font-bold rounded-full pt-2 pb-2 hover:bg-green-700 pl-6 pr-6' >Social</button>
      
      </>) : (<><button className=' text-md bg-pink-500 font-bold rounded-full pt-2 pb-2 hover:bg-pink-700 pl-6 pr-6' onClick={HandleLogin}>Log In</button>
    <button className='text-md bg-green-400 font-bold rounded-full pt-2 pb-2 hover:bg-green-700 pl-6 pr-6' onClick={HandleSignup}>Sign Up</button></>)}
      
      
    
    </div>
   </div>
   </>
  );
}

export default Nav;