import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

// pages
import Home from './Home'
import Error from './Error'
import Login from './Login'
import Register from './Register'

const RouterSetup = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Login/>
                </Route>
                <Route path="/register">
                    <Register/>
                </Route>
                <Route path="/home">
                    <Home/>
                </Route>
                <Route path="*">
                    <Error/>
                </Route>
            </Switch>
        </Router>
    )
}

export default RouterSetup