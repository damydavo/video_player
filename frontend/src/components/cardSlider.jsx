import React from "react";
import Card from "./card";
import styled from "styled-components";
import { useState, useRef } from "react";
import { AiOutlineLeft } from "react-icons/ai";

const CardSlider = ({ data, title }) => {
    const [controlShow, setControlShow] = useState(false)
    const listRef = useRef()
    return (
        <Container className="flex column" onMouseEnter={() => setControlShow(true)} onMouseLeave={() => setControlShow(false)}>
            <h1>{title}</h1>
            <div className="wrapper">
                <div className={`slider-action left ${!controlShow ? "none" : ""} flex j-center`}>
                    <AiOutlineLeft />
                </div>
            </div>
            <div className="flex">
                {data.map((movie, index) => {
                    return <Card movieData={movie} index={index} key={movie.id} />
                })}
            </div>

        </Container>
    );
}

const Container = styled.div`

`
export default CardSlider;