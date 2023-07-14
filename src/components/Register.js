import React from "react";
import { Navigate, Link } from 'react-router-dom';
import Authentication from './Authentication.js'

const Register = ({ loggedIn }) => {
    return (
        loggedIn ?
            <Navigate to="/" replace />
            :
            <Authentication title="Регистрация" buttonText="Зарегистрироваться">
                <p className="authorization__link-login">Уже зарегистрированы? <Link className="authorization__link hover" to='/sign-in'>Войти</Link></p>
            </Authentication>

    )
}

export default Register;