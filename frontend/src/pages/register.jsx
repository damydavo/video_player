import React from "react";
import styled from 'styled-components'
import NavBar from './../components/navbar';
import BackgroundImage from './../components/backgroundImage';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { register, reset } from "../features/auth/authSlice";
import { toast } from 'react-toastify'
import { useNavigate } from "react-router-dom";


const Register = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const { email, password } = formData


    const { user, isError, isSuccess, message } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        //redirect if it is successful
        if (isSuccess || user) {
            navigate('/')
            dispatch(reset())

        }
    }, [isError, isSuccess, user, navigate])

    const handleChange = (e) => {
        setFormData((prevState) => ({
            ...prevState, [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const userData = {
            email,
            password
        }
        dispatch(register(userData))
    }


    return (
        <Container showPassword={showPassword}>
            <BackgroundImage />
            <div className="content">
                <NavBar />
                <div className="body flex column a-center j-center">
                    <div className="text flex column">
                        <h1>Access to movies.</h1>
                        <h4>Watch anywhere. Cancel anytime</h4>
                        <h6>Ready to watch? Enter your email</h6>
                    </div>

                    <div className="form">
                        {/* <input type="name" placeholder="your name" /> */}
                        <input onChange={handleChange} type="email" placeholder="email address" name="email" value={email} />

                        {showPassword && <input onChange={handleChange} type="password" placeholder="password" name="password" value={password} />
                        }
                        {!showPassword && <button onClick={() => setShowPassword(true)}>Get Started</button>
                        }
                    </div>
                    <button onClick={handleSubmit}>Register</button>
                </div>
            </div>

        </Container>
    );
}


const Container = styled.div`
position:relative;
.content { 
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    height:100vh;
    width: 100vw;
    display: grid;
    grid-template-rows:15vh 85vh;

    .body {
        gap: 1rem;
        text-align: center;
        font-size: 2rem;
        width: 100%;
        .text {
            display: none;
        }
        h1{
            padding: 0 25rem;
        }
        @media screen and (max-width: 768px) {
            justify-content: center;
            width: 180px;
}
    }
    .form {
        display: grid;
        grid-template-columns: ${({ showPassword }) => showPassword ? '1fr 1fr' : '2fr 1fr'};
        width: 60%;
        @media screen and (max-width: 768px) {
            grid-template-columns: ${({ showPassword }) => showPassword ? '1fr' : '1fr'};
        }
      
        input {
            padding: 1.5rem;
            color: black;
            border: none;
            font-size: 1.5rem;
            border: 1px solid black;
            &:focus {
                outline: none;
            } 
        }
        button {
            padding: 0.5rem 1rem;
            background-color: #e50940;
            border: none;
            cursor: pointer;
            color: white;
            font-weight: bolder;
            font-size: 1.05rem;

            
        }
    }
    button {
        padding: 0.5rem 1rem;
        background-color: #e50940;
        border: none;
        cursor: pointer;
        color: white;
        border-radius: 0.2rem;
        font-weight: bolder;
        font-size: 1.05rem;
    }

    @media screen and (max-width: 768px) {
            button {
                padding: 24px;
                justify-content: center;
            }
    }
}
  
`

export default Register;