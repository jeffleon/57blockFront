import {useState, useEffect} from 'react'

const useFetch = url =>{
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{
        const fetchsrc = async () =>{
            try{
                const response = await fetch(url,{ 
                    credentials: 'include',
                    headers:{
                        'Content-Type': 'application/json'
                    }
                  })
                const data = await response.json()
                setData(data)
                setLoading(false)
            }catch(error){
                setLoading(false)
                setError(error)
            }
        }
        fetchsrc()
    },[url])

    return {data, loading, error}
}

export default useFetch