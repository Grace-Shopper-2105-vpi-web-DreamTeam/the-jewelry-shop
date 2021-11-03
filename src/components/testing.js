import React from "react"
import { Link } from "react-router-dom";

export default function Testing({category}) {
    return (
        <div>
            <Link to="/jewelry"> Products Page </Link>
            <br />
            <Link to="/jewelry/:category"> Products By Category Page </Link>
            <br />
            <Link to="/login"> Login </Link>
            <br />
            <Link to="/register"> Register </Link>
        </div>
    )
}