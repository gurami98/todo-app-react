import React, {useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import CustomErrorContainer from "./components/CustomErrorContainer";
const Error = () => {
    const history = useHistory()
    const [seconds, setSeconds] = useState(3)

    useEffect(() => {
        let countdownInterval = setInterval(() => {
            setSeconds(seconds - 1)
        }, 1000)
        return () => clearInterval(countdownInterval)
    })

    useEffect(() => {
        let redirectTimer = setTimeout(() => {
            history.push('/')
        }, 3000)
        return () => clearTimeout(redirectTimer)
    }, [])
    return (
        <CustomErrorContainer>
            <h1>404</h1>
            <h1>Page Not Found</h1>
            <h1>Redirecting in {seconds}</h1>
        </CustomErrorContainer>
    )
}

export default Error;
