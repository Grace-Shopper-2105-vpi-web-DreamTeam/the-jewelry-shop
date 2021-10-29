import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
    const loggedIn = localStorage.getItem("CurrentUserToken")

    function handleLogOut() {
        localStorage.removeItem("CurrentUserToken")
        location.reload()
    }

    return (
        <div>
            Home Page
        </div>
    )
}