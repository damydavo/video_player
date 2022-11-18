import React from "react";
import background from './assets/login.jpg'
import styled from "styled-components"


const BackgroundImage = () => {
    return (
        <Container>
            <img src={background} alt="Background" />

        </Container>
    );
}

const Container = styled.div`
height: 100vh;
width: 100vw;
img {
 height: 100vh;
 width: 100vw;
 @media screen and (max-width: 768px) {
    height: 100%;
    width: 100%;
    object-fit: cover;
}
}
`;

export default BackgroundImage;