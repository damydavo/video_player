import React from "react";
import styled from "styled-components";
import spinner from '../assets/spinner.gif'

const Spinner = () => {
    return (
        <Container>
            <img src={spinner} alt="Spinner-loading" />
        </Container>
    );
}


const Container = styled.div`
  img {
    display: flex;
    margin-left: auto;
    margin-right: auto;
    margin-top: 208px;
    margin-bottom: 208px;
    width: 13rem;
    height: 13rem;
  }
  
  }
`
export default Spinner;