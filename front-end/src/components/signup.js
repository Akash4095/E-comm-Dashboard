import React, { useEffect, useState } from "react";
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const [name, setName] = useState("");
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

  const handleSignup = async () => {
    if (!name || !email || !password) {
      setError(true)
      return false
    }
    let body = { name: name, email: email, password: password }
    const res = await axios.post("http://localhost:5000/signup", body)
    console.log('response', res.data)
    if (res.status == 200) {
      localStorage.setItem("user", JSON.stringify(res.data.result))
      navigate("/login")
    }
  };


  return (
    <div className="signup">
      <h2>Register</h2>
      <input
        className="inputBox"
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {
        error && !name && <span className='invalid-input'>Enter Valid Name</span>
      }
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
        onClick={() => handleSignup()}
      >
        Sign Up
      </button>
    </div>
  );
};

export default Signup;
