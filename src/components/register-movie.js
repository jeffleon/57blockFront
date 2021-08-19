import React, {useState} from 'react'
import { Form, Button, Container, Header} from 'semantic-ui-react'
import HeaderMenu from '../components/navBar';
import { useHistory } from "react-router-dom";
import './components.css';

const RegisterMovie = ({page, movie}) => {
    const [value, setValue] = useState({'name': movie?.name,'release': movie?.release,'director': movie?.director, "description": movie?.description, "genre": movie?.genre});
    let url = 'http://localhost:9000/user/movie';
    let history = useHistory();
    let id = sessionStorage.getItem("user_id");

    async function handleSubmit(event) { 
        let data = value;
        let method = 'POST';
        event.preventDefault()
        if (page === 'Edit'){
            method = 'POST'
            url += `/${movie?.ID}` 
        }
        let res = await fetch(url, {
            method: method, 
            body: JSON.stringify({...data,"user_id": parseInt(id)}),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        let response = await res.json();
        history.push("/home");
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValue(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    return (
        <div className="Component">
            <HeaderMenu 
                onItemClick={item => this.onItemClick(item)}
                items={[
                  ["Home", "/home"],
                  ["Create Movie", "/movie/register"]
                ]}
                headerIcon={"compass outline"}
                />
            <Container text>
                <Form onSubmit={(e)=>handleSubmit(e)}>
                    <Header as='h1'>{page} movie 🤖</Header>
                    <Form.Input 
                        required 
                        label='Genre' 
                        placeholder='Genre'
                        onChange={(e)=>handleInputChange(e)} 
                        value={value.genre}
                        name='genre'
                    />
                    <Form.Input 
                        required 
                        label='Name' 
                        placeholder='Name' 
                        onChange={(e)=>handleInputChange(e)} 
                        value={value.name}
                        name='name'
                    />   
                    <Form.Input 
                        label='Director'
                        placeholder='Director'
                        onChange={(e)=>handleInputChange(e)} 
                        value={value.director}
                        name='director'    
                    />
                    <Form.Input 
                        label='Release' 
                        placeholder='Release' 
                        onChange={(e)=>handleInputChange(e)} 
                        value={value.release}
                        name='release'    
                    />
                    <Form.TextArea 
                        label='Description'
                        placeholder='Tell me more...'
                        onChange={(e)=>handleInputChange(e)} 
                        value={value.description}
                        name='description'   
                    />
                    <Button type='submit' primary>Submit</Button>
                </Form>
            </Container>
        </div>
    )
}
    
export default RegisterMovie