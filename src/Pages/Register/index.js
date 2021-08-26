import React, {useState} from 'react'
import {registerUser} from "../../API/userAPI"
import {Link, Redirect} from "react-router-dom";
import Cookies from "js-cookie";
const Register = ({alertHandler}) => {
    const jwt = Cookies.get('jwt')
    const [user, setUser] = useState({
        username: '',
        email: '',
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
            await registerUser(user)
            setUser({
                username: '',
                email: '',
                password: ''
            })
            alertHandler('Successfully Registered', 'success')
        }catch(e){
            alertHandler(e.response.data.message, 'error')
        }
    }

    if(jwt) {
        return <Redirect to='/home'/>
    }

    return (
        <div>
            <form onSubmit={handleFormSubmit}>
                <label htmlFor="username">Username: </label>
                <br/>
                <input type="text" id='username' name='username' value={user.username} onChange={handleFormInputChange}/>
                <br/>
                <label htmlFor="email">Email: </label>
                <br/>
                <input type="email" id='email' name='email' value={user.email} onChange={handleFormInputChange}/>
                <br/>
                <label htmlFor="password">Password: </label>
                <br/>
                <input type="password" id='password' name='password' value={user.password} onChange={handleFormInputChange}/>
                <br/>
                <button type='submit'>Register</button>
                <br/>
                <span>Already Registered ? <Link to='/login'>Login</Link> </span>
            </form>
        </div>
    )
}

export default Register
