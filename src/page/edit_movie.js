import React from 'react'
import useFetch from '../hooks/useFetch'
import Loading from '../components/loading'
import RegisterMovie from "../components/register-movie"
import { useParams } from 'react-router-dom';


const EditMovie = () =>{
    let { id } = useParams();
    const {data , loading, error} = useFetch(`http://localhost:9000/user/movie/${id}`) 

    if (loading)
        return <Loading/>
    if (error)
        return <p>Error</p>
    if (data)
    { 
        return  <RegisterMovie page="Edit" movie={data.data} />
          
    }   
}

export default EditMovie