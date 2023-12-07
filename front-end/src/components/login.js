import React, { useEffect, useState } from "react";
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate()
    const auth = localStorage.getItem("user")

    useEffect(() => {
        if (auth) {
            navigate('/')
        }
    }, [])

    const handleLogin = async () => {
        let body = { email: email, password: password }
        const res = await axios.post("http://localhost:5000/login", body)
        console.log('response', res.data)
        if (res.status == 200) {
            localStorage.setItem("user", JSON.stringify(res.data))
            navigate("/")
        }
    };


    return (
        <div className="login">
            <h2>Login</h2>
            <input
                className="inputBox"
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                className="inputBox"
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button
                className="login-btn"
                type="button"
                onClick={() => handleLogin()}
            >
                Login
            </button>
        </div>
    );
};

export default Login;