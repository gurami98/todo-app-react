import React from 'react'
import {Link, useHistory} from 'react-router-dom'

const Login = () => {
    const history = useHistory()


    const handleLogin = () => {
        history.push('./home')
    }
    return (
        <div>
            <Link to='/register'>Register</Link>
            <br/>
            <button onClick={handleLogin}>Login</button>
        </div>
    )
}

export default Login;
