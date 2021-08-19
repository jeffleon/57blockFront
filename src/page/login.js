import React, {useState} from 'react'
import { Form, Button, Container, Header, Message, Icon} from 'semantic-ui-react'
import { useHistory, Link } from "react-router-dom";
import auth from "../utils/auth";
import './pages.css';

const Login = (props) => {
    const [value, setValue] = useState({'email': '','password': ''});
    let url = 'http://localhost:8000/login';
    let history = useHistory();

    async function handleSubmit(event){ 
        let data = value;
        event.preventDefault()
        let res = await fetch(url, {
            method: 'POST', 
            body: JSON.stringify(data),
            credentials: 'include',
            headers:{
                'Content-Type': 'application/json'
            }
        })
        let response = await res.json()
        
        if ('message' in response && response.status === 'ok'){
            sessionStorage.setItem('auth', true);
            sessionStorage.setItem('user_id', response.id);
            auth.login();
            history.push('/home');
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValue(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    
    return (
        <div className="App">   
            <Container text>
                <Form onSubmit={(e)=>handleSubmit(e)}>
                    <Header as='h1'>Login 🤞</Header>
                        <Form.Input 
                            onChange={(e)=>handleInputChange(e)} 
                            label='Email'
                            value={value.email} 
                            placeholder='Email' 
                            name='email'    
                        />   
                        <Form.Input 
                            onChange={(e)=>handleInputChange(e)} 
                            label='Password' 
                            type='password' 
                            placeholder='Password' 
                            value={value.password}
                            name='password'    
                        />
                    <Button type='submit' primary>Submit</Button>
                </Form>
                <br/>
                <Message attached='bottom' warning>
                <Icon name='add user' />
                    You have an account?&nbsp;<Link to='/register'>Sign up</Link>&nbsp;instead.
                </Message>
            </Container>
        </div>  
    )
}
    
export default Login