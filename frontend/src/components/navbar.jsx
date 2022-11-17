import React from "react";
import styled from 'styled-components'
import logo from './assets/logo.png'
import { useNavigate } from "react-router-dom";

const NavBar = () => {
    const navigate = useNavigate()

    return (
        <Container className="flex a-center j-between">
            <div className="logo">
                <img src={logo} alt="logo" />
            </div>

            <button onClick={() => navigate("/register")}>Sign up</button>
        </Container>
    );
}

const Container = styled.div`
 padding: 0 4rem;
 .logo {
    img {
        height: 5rem;
    }
 }
 button {
    padding: 0.5rem 1rem;
    background-color: #e50940;
    border: none;
    cursor: pointer;
    color: white;
    border-radius: 0.2rem;

 }
`

export default NavBar;