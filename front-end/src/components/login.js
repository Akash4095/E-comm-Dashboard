import React, { useEffect, useState } from "react";
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const navigate = useNavigate()
    const auth = localStorage.getItem("user")

    useEffect(() => {
        if (auth) {
            navigate('/')
        }
    }, [])

    const handleLogin = async () => {
        let body = { email: email, password: password }
        if (!email || !password) {
            setError(true)
            return false
        }
        const res = await axios.post("http://localhost:5000/login", body)
        console.log('response', res.data)
        if (res.status == 200) {
            if (res.data.authToken) {
                localStorage.setItem("user", JSON.stringify(res.data.user))
                localStorage.setItem("authToken", JSON.stringify(res.data.authToken))
                navigate("/")
            } else {
                alert("Please enter correct details")
            }

        }
    };


    return (
        <div className="login">
            <div>
                <h2>Login</h2>
                <input
                    className="inputBox"
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {
                    error && !email && <span className='invalid-input'>Enter Valid Email</span>
                }
                <input
                    className="inputBox"
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {
                    error && !password && <span className='invalid-input'>Enter Valid Password</span>
                }
                <button
                    className="add-btn"
                    type="button"
                    onClick={() => handleLogin()}
                >
                    Login
                </button>
            </div>
        </div>
    );
};

export default Login;