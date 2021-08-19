import React from 'react'
import useFetch from '../hooks/useFetch'
import Loading from '../components/loading'
import Register from "../components/register"
import { useParams } from 'react-router-dom';

const EditUser = () =>{
    let { id } = useParams();
    const {data , loading, error} = useFetch(`http://localhost:8000/user/${id}`) 

    if (loading)
        return <Loading/>
    if (error)
        return <p>Error</p>
    if (data)
    { 
        console.log(data);
        return   <Register page="Edit" user={data.data} />    
    }  
}

export default EditUser 