import React, {useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'

const Error = () => {
    const history = useHistory()
    const [seconds, setSeconds] = useState(4)

    useEffect(() => {
        let countdownInterval = setInterval(() => {
            setSeconds(seconds - 1)
        }, 1000)
        return () => clearInterval(countdownInterval)
    })

    useEffect(() => {
        let redirectTimer = setTimeout(() => {
            history.push('/')
        }, 4000)
        return () => clearTimeout(redirectTimer)
    }, [])
    return (
        <div>
            <h1>Page Not Found</h1>
            <h1>Redirecting in {seconds}</h1>
        </div>
    )
}

export default Error;
