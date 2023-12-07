import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const auth = localStorage.getItem("user")
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.clear()
        navigate("/login")
    }

    return (
        <div>
            <ul className='nav-ul'>
                <li> <Link to="/" >Products</Link> </li>
                <li> <Link to="/add" >Add Product</Link> </li>
                <li> <Link to="/update" >Update Product</Link> </li>
                <li> <Link to="/profile" >Profile</Link> </li>

                {auth ? <li> <Link to="/login" onClick={() => handleLogout()}>Logout</Link> </li> :
                    <>
                        <li> <Link to="/signup" >Signup</Link> </li>
                        <li> <Link to="/login" >Login</Link> </li>
                    </>

                }

            </ul>
        </div>
    )
}

export default Navbar