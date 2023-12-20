import React from 'react';
import axios from 'axios';

const SearchBar = (props) => {

    const { setResults,setClose } = props.data;

    const handleChange = async(evt) => {
        
        console.log('hello');

        console.log(evt.target.value);
        const query = evt.target.value;
        if(query === ""){
            setResults([]);
            return;
        }
        
        const url = "http://localhost:8080/friends/search";
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
            params: {
                query: query,
            },
        });

    
        setResults(response.data);
        setClose(false);

       
        
    }

    const {  name, placeholder } = props.data;

    return(
        <input type="text" name={name} className=" w-52 rounded-lg h-12 pl-7  font-normal text-sm" style={{backgroundColor:'#232360',color:'white'}} placeholder={placeholder} onChange={handleChange}  />
    )


}

export default SearchBar;