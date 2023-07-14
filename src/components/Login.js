import React from "react";
import { Navigate } from 'react-router-dom';
import Authentication from './Authentication.js'

const Login = ({ loggedIn }) => {
    return (
        loggedIn ?
            <Navigate to="/" replace />
            :
            <Authentication title="Вход" buttonText="Войти"></Authentication>
    )
}

export default Login;