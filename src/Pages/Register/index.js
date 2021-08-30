import React, {useState} from 'react'
import {registerUser} from "../../API/userAPI"
import {Link, Redirect} from "react-router-dom";
import Cookies from "js-cookie";
import CustomInput from "../../components/UIKITS/CustomInput";
import CustomFormContainer from "../../components/UIKITS/CustomFormContainer";
import CustomForm from "../../components/UIKITS/CustomForm";
import CustomFormSubmitButton from "../../components/UIKITS/CustomFormSubmitButton";
import alertHandler from "../../helpers/alertHelper";

const Register = () => {
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
        return <Redirect to='/'/>
    }

    return (
        <CustomFormContainer>
            <CustomForm onSubmit={handleFormSubmit}>
                <label htmlFor="username">Username: </label>
                <CustomInput type="text" id='username' name='username' value={user.username} onChange={handleFormInputChange}/>
                <label htmlFor="email">Email: </label>
                <CustomInput type="email" id='email' name='email' value={user.email} onChange={handleFormInputChange}/>
                <label htmlFor="password">Password: </label>
                <CustomInput type="password" id='password' name='password' value={user.password} onChange={handleFormInputChange}/>
                <CustomFormSubmitButton type='submit'>Register</CustomFormSubmitButton>
                <span>Already Registered ? <Link to='/login'>Login</Link> </span>
            </CustomForm>
        </CustomFormContainer>
    )
}

export default Register
