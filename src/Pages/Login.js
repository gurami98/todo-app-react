import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {loginUser} from "../API/userAPI";
import Cookies from 'js-cookie'

const Login = ({alertHandler}) => {
    const history = useHistory()
    const [user, setUser] = useState({
        username: '',
        password: ''
    })

    const handleFormInputChange = (e) => {
        const {name, value} = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await loginUser(user)
            const token = response.data
            setUser({
                username: '',
                password: ''
            })
            Cookies.set('jwt', token)
            alertHandler('Successfully Logged in', 'success')
            history.push('/home')
        }catch(e){
            alertHandler(e.response.data.message, 'error')
        }
    }

    return (
        <div>
            <form onSubmit={handleFormSubmit}>
                <label htmlFor="username">Username: </label>
                <br/>
                <input type="text" id='username' name='username' value={user.username} onChange={handleFormInputChange}/>
                <br/>
                <label htmlFor="password">Password: </label>
                <br/>
                <input type="password" id='password' name='password' value={user.password} onChange={handleFormInputChange}/>
                <br/>
                <button type='submit'>Login</button>
                <br/>
                <span>Not Registered Yet ? <Link to='/register'>Register</Link> </span>
            </form>
        </div>
    )
}

export default Login;
