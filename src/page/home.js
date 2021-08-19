import React, {useParams} from 'react'
import useFetch from '../hooks/useFetch'
import Loading from '../components/loading'
import Register from "../components/register"
import GetMovies from '../components/get_movies';

const Home = () =>{
    let id = sessionStorage.getItem("user_id");
    const {data , loading, error} = useFetch(`http://localhost:9000/user/${id}/movies`) 

    if (loading)
        return <Loading/>
    if (error)
        return <p>Error</p>
    if (data)
    { 
        console.log(data);
        return   <GetMovies movies={data.data} />    
    }   
}

export default Home 


