import App from "../../App"
import {useEffect, useState} from "react";
import Cookies from 'js-cookie'
import {Redirect, useHistory} from "react-router-dom";
import {useLocation} from "react-router-dom";
import CustomHeading from "./components/CustomHeading";
import CustomLogoutBtn from "./components/CustomLogoutBtn";
const Home = () => {
    const [currentUsername, setCurrentUsername] = useState('default name')
    const jwt = Cookies.get('jwt')
    const history = useHistory()
    const location = useLocation()
    useEffect(() => {
        const state = location.state || undefined
        state && setCurrentUsername(state)
    }, [location])

    const logOut = () => {
        Cookies.remove('jwt')
        history.push('/login')
    }

    if(!jwt) {
        return <Redirect to='/login'/>
    }

    return (
        <>
            <CustomHeading>Welcome, {currentUsername}</CustomHeading>
            <CustomLogoutBtn onClick={logOut}>Logout</CustomLogoutBtn>
            <App/>
        </>
    )
}

export default Home