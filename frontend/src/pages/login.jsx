import React from "react";
import styled from 'styled-components'
import NavBar from './../components/navbar';
import BackgroundImage from './../components/backgroundImage';
import { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux'
// import { login } from "../features/auth/authSlice";
// import { toast } from 'react-toastify'
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const { email, password } = formData


    // const { user, isError, isSuccess, message } = useSelector(state => state.auth)
    // const dispatch = useDispatch()

    // useEffect(() => {
    //     if (isError) {
    //         toast.error(message)
    //     }
    //     //redirect if it is successful
    //     if (isSuccess || user) {
    //         navigate('/')
    //     }
    // }, [isError, isSuccess, user, navigate])

    const handleChange = (e) => {
        setFormData((prevState) => ({
            ...prevState, [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        // const userData = {
        //     email,
        //     password
        // }
        // dispatch(register(userData))
    }


    return (
        <Container>
            <BackgroundImage />
            <div className="content">
                <NavBar />
                <div className="form-container flex column a-center j-center">
                    <div className="form flex column a-center j-center">
                        <div className="title">
                            <h3>Login</h3>
                        </div>
                        <div className="container flex column">
                            <input onChange={handleChange} type="email" placeholder="email address" name="email" value={email} />
                            <input onChange={handleChange} type="password" placeholder="password" name="password" value={password} />

                            <button onClick={handleSubmit}>Login</button>

                        </div>
                    </div>

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
    .form-container {
        gap: 2rem;
        height:85vh;
        .form {
            padding: 2rem;
            background-color: #000000b0;
            width: 25vw;
            gap: 2rem;
            color: #ffffff;
            .container {
                gap: 2rem;
            input {
                padding: 0.5rem 1rem;
                width: 15rem;
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
                width: 15rem;

            }
            }
        }
    }
}
  
`

export default Login;