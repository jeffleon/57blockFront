import React, {useState} from 'react'
import { Redirect, Link } from 'react-router-dom';
import { Form, Button, Container, Header, Message, Icon} from 'semantic-ui-react';
import HeaderMenu from '../components/navBar';
import validator from 'validator';
import './components.css';

const Register = ({page, user}) => {
    const [value, setValue] = useState({'name': user?.name,'email': user?.email,'password': user?.password});
    const [redirect, setRedirect] = useState(false);
    const [errorPassword, setErrorPassword] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    let url = 'http://localhost:8000/';
    let id = sessionStorage.getItem("user_id");
    let redirection = page === 'edit'?"/home":"/login";

    async function handleSubmit(event) { 
        let data = value;
        event.preventDefault()
        let res = await fetch(url, {
            method: 'POST', 
            body: JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        let response = await res.json();
        
        setRedirect(true);
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValue(prevState => ({
            ...prevState,
            [name]: value
        }));
        if (name === 'email'){
            if (!validator.isEmail(value)) {
                setErrorEmail(`${value} is not a valid email.`)
            } else {
                setErrorEmail(null)
            }
        }
        if (name === 'password') {
            if (validator.isStrongPassword(value, {
                minLength: 8, minLowercase: 1,
                minUppercase: 1, minNumbers: 1, minSymbols: 1
              })) {
                setErrorPassword(null)
              } else {
                setErrorPassword('Is Not Strong Password, the password must contain at least 1 number at least 1 lower case letter at least 1 upper case and at least 1 special character')
            }
        }        
    }
    
    if (redirect){
        return(<Redirect to={redirection}/>)
    }
    
    return (
        <div className="Component">
            {page === 'Edit' &&
            <HeaderMenu 
                onItemClick={item => this.onItemClick(item)}
                items={[
                  ["Home", "/home"],
                  ["Create Movie", "/movie/register"]
                ]}
                headerIcon={"compass outline"}
            />}
            <Container text>
                <Form onSubmit={(e)=>handleSubmit(e)}>
                    <Header as='h1'>{page} user 🤘</Header>
                    <Form.Input 
                        required 
                        onChange={(e)=>handleInputChange(e)}
                        label='Name' 
                        placeholder='Name' 
                        value={value.name}
                        name='name'
                    />
                    <Form.Input 
                        required
                        onChange={(e)=>handleInputChange(e)}
                        label='Email' 
                        placeholder='Email' 
                        value={value.email}
                        name='email'
                        error={errorEmail}
                    />   
                    <Form.Input 
                        required
                        onChange={(e)=>handleInputChange(e)} 
                        label='Password'
                        type='password'
                        placeholder='Password'
                        value={value.password}
                        name='password'
                        error={errorPassword}
                    />
                    <Button type='submit' primary>Submit</Button>
                </Form>
                <br/>
                {page !== 'Edit'&&
                <Message attached='bottom' warning>
                    <Icon name='help' />
                        Already signed up?&nbsp;<Link to='/login'>Login in</Link>&nbsp;instead.
                </Message>}
            </Container>
        </div>
    )
}
    
export default Register