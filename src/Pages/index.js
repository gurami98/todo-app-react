import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {closeAlert, showAlert} from "../store/actionCreators";
// pages
import Home from './Home'
import Error from './Error'
import Login from './Login'
import Register from './Register'
import {connect} from "react-redux";
import CustomAlert from "../components/CustomAlert"
import * as todoSelectors from "../selectors/todoSelectors";

const RouterSetup = ({showAlert, closeAlert, alertInfo}) => {
    const alertHandler = (alertText, alertType) => {
        showAlert(alertText, alertType)
        setTimeout(() => {
            closeAlert()
        }, 3000)
    }
    return (
        <Router>
            <Switch>
                <Route exact path={['/', '/home']}>
                    <Home/>
                </Route>
                <Route path='/login'>
                    <Login alertHandler={alertHandler}/>
                </Route>
                <Route path='/register'>
                    <Register alertHandler={alertHandler}/>
                </Route>
                <Route path='*'>
                    <Error/>
                </Route>
            </Switch>
            {alertInfo.alertVisible && <CustomAlert/>}
        </Router>
    )
}

const mapStateToProps = (state) => {
    return {
        alertInfo: todoSelectors.getAlertInfo(state)
    }
}

const mapDispatchToProps = {
    showAlert,
    closeAlert
}

export default connect(mapStateToProps, mapDispatchToProps)(RouterSetup)