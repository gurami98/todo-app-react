import App from "../../App"
import Cookies from 'js-cookie'
import {Redirect, useHistory} from "react-router-dom";
import CustomHeading from "./components/CustomHeading";
import CustomLogoutBtn from "./components/CustomLogoutBtn";
import * as userSelectors from "../../selectors/userSelectors";
import {connect} from "react-redux";
import {useEffect} from "react";
import {setUsername} from "../../store/actionCreators";
import {welcomeUser} from "../../API/userAPI";
import alertHandler from "../../helpers/alertHelper";

const Home = ({username, setUsername}) => {
    const jwt = Cookies.get('jwt')
    const history = useHistory()

    useEffect(() => {
        getUsername()
    }, [])

    const getUsername = async () => {
        try {
            const usernameResponse = await welcomeUser({token: jwt})
            const userName = usernameResponse.data
            setUsername(userName)
        }catch(e){
            alertHandler(e.response.data.message, 'error')
        }
    }

    const logOut = () => {
        Cookies.remove('jwt')
        history.push('/login')
    }

    if(!jwt) {
        return <Redirect to='/login'/>
    }

    return (
        <>
            <CustomHeading>Welcome, {username}</CustomHeading>
            <CustomLogoutBtn onClick={logOut}>Logout</CustomLogoutBtn>
            <App/>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        username: userSelectors.getCurrentUsername(state)
    }
}

const mapDispatchToProps = {
    setUsername
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)