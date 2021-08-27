import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
// pages
import Home from './Home'
import Error from './Error'
import Login from './Login'
import Register from './Register'
import {connect} from "react-redux";
import CustomAlert from "../components/CustomAlert"
import * as todoSelectors from "../selectors/todoSelectors";

const RouterSetup = ({alertInfo}) => {
    return (
        <Router>
            <Switch>
                <Route exact path={['/', '/home']}>
                    <Home/>
                </Route>
                <Route path='/login'>
                    <Login/>
                </Route>
                <Route path='/register'>
                    <Register/>
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

export default connect(mapStateToProps)(RouterSetup)