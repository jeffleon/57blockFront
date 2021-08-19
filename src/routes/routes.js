import React, {useState, useEffect} from 'react';
import Register from "../components/register";
import Login from "../page/login";
import RegisterMovie from "../components/register-movie";
import EditUser from '../page/edit_user';
import {Switch, Route, Redirect} from 'react-router-dom';
import { ProtectedRoute } from "./protected.route";
import EditMovie from '../page/edit_movie';
import Home from '../page/home'
import auth from '../utils/auth'
import { useHistory } from "react-router-dom";

const Routes_ = () => {
    let history = useHistory()
    useEffect(() => {
        (
            async () => {
                const response = await fetch('http://localhost:8000/user', {
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include',
                });
                const content = await response.json();
                if (sessionStorage.getItem('auth')){
                    auth.isAuthenticated = sessionStorage.getItem('auth');
                }
                if (history.location.pathname !== '/register') {
                    content?.name?authorizated(content):unAuthorizated();
                    
                }   
            }
        )();
    });

    function authorizated(user){
        sessionStorage.setItem("user", JSON.stringify(user));
        auth.login()
    }

    function unAuthorizated(){
        sessionStorage.setItem('auth', false);
        history.push('/login');
    }

    return(
        <Switch>
            <Route exact path="/login" component={()=><Login />} />
            <Route exact path="/register" component={() => <Register page="Create" />}  />
            <ProtectedRoute exact path="/edit/user/:id" component={() => <EditUser />} />
            <ProtectedRoute exact path="/movie/register" component={() => <RegisterMovie page="Create"/>} />
            <ProtectedRoute exact path="/movie/edit/:id" component={() => <EditMovie  />} />
            <ProtectedRoute exact path="/home" component={() => <Home />} />
            <Redirect to="/login"/>
        </Switch>
    );
}

export default Routes_