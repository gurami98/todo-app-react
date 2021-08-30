import React, {useState} from 'react'
import {Link, Redirect, useHistory} from 'react-router-dom'
import {loginUser, welcomeUser} from "../../API/userAPI";
import Cookies from 'js-cookie'
import CustomFormContainer from "../../components/UIKITS/CustomFormContainer";
import CustomForm from "../../components/UIKITS/CustomForm";
import CustomInput from "../../components/UIKITS/CustomInput";
import CustomFormSubmitButton from "../../components/UIKITS/CustomFormSubmitButton";
import alertHandler from "../../helpers/alertHelper";
import {setUsername} from "../../store/actionCreators";
import {connect} from "react-redux";

const Login = ({setUsername}) => {
    const history = useHistory()
    const jwt = Cookies.get('jwt')
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
            const in15Minutes = 1/192
            Cookies.set('jwt', token, {
                expires: in15Minutes
            })
            const usernameResponse = await welcomeUser({...user, token})
            const userName = usernameResponse.data
            setUsername(userName)
            setUser({
                username: '',
                password: ''
            })
            history.push('/home')
            alertHandler('Successfully Logged in', 'success')
        }catch(e){
            alertHandler(e.response.data.message, 'error')
        }
    }

    if(jwt) {
        return <Redirect to='/home'/>
    }

    return (
        <CustomFormContainer>
            <CustomForm onSubmit={handleFormSubmit}>
                <label htmlFor="username">Username: </label>
                <CustomInput type="text" id='username' name='username' value={user.username} onChange={handleFormInputChange}/>
                <label htmlFor="password">Password: </label>
                <CustomInput type="password" id='password' name='password' value={user.password} onChange={handleFormInputChange}/>
                <CustomFormSubmitButton type='submit'>Login</CustomFormSubmitButton>
                <span>Not Registered Yet ? <Link to='/register'>Register</Link> </span>
            </CustomForm>
        </CustomFormContainer>
    )
}

const mapDispatchToProps = {
    setUsername
}

export default connect(null, mapDispatchToProps)(Login);
