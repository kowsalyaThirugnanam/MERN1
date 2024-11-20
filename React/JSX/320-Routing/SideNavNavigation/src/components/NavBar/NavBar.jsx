import React from 'react'
import { Link,Outlet } from "react-router-dom";

const NavBar = () => {
    return (
        <>
            <nav>
                <ul>
                    <Link to="home" >Home </Link>
                    <Link to="layout">Layout</Link>

                </ul>
            </nav>
            <div>
                <Outlet />
            </div>
        </>
    )
}

export default NavBar
