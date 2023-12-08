import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from "../logo.png"

const Navbar = () => {
    const auth = localStorage.getItem("user")
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.clear()
        navigate("/login")
    }

    return (
        <div className='nav-ul'>
            <img src={logo} alt="" className='logo' />
            {
                auth ?
                    <ul >
                        <li> <Link to="/" >Products</Link> </li>
                        <li> <Link to="/add" >Add Product</Link> </li>
                        
                        {/* <li> <Link to="/profile" >Profile</Link> </li> */}

                        {auth ? <li> <Link to="/login" onClick={() => handleLogout()}>Logout <span className='username'>({JSON.parse(auth).name})</span> </Link> </li> :
                            <>
                                <li> <Link to="/signup" >Signup</Link> </li>
                                <li> <Link to="/login" >Login</Link> </li>
                            </>

                        }

                    </ul>
                    :
                    <ul className='nav-ul nav-right'>
                        <li> <Link to="/signup" >Signup</Link> </li>
                        <li> <Link to="/login" >Login</Link> </li>
                    </ul>
            }

        </div>
    )
}

export default Navbar