import React from "react";
import { useState, useEffect } from "react";
import Header from '../components/header';
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, fetchMovies } from '../features/movies/movieSlice';
import Slider from '../components/slider';
import NotAvailable from '../components/notAvailable';
import SelectGenre from "./selectGenre";


const TvPage = () => {

    const [isScrolled, setScrolled] = useState(false)

    const { genres, movies, genresLoaded } = useSelector((state) => state.netflix);

    // const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getGenres());
    }, [dispatch]);

    useEffect(() => {
        if (genresLoaded) dispatch(fetchMovies({ genres, type: "tv" }));

    }, [genresLoaded, dispatch]);

    window.onscroll = () => {
        setScrolled(window.pageYOffset === 0 ? false : true);
        return () => (window.onscroll = null)
    }

    return (
        <Container>
            <div className="navbar">
                <Header isScrolled={isScrolled} />

            </div>
            <div className="data">
                <SelectGenre genres={genres} type="tv" />
                {
                    movies.length > 0 ? <Slider movies={movies} /> : <NotAvailable />
                }
            </div>

        </Container>

    );
}

const Container = styled.div`
  .data {
    margin-top: 8rem;
    z-index: 1;
    .not-available {
        text-align: center;
        color: #ffffff;
        margin-top: 4rem;
    }
    select {
        margin-left: 40px;
        padding: 6px;
        cursor: pointer;
        font-size: 1.4rem;
        background-color: rgba(0,0,0,0.4);
        color: #ffffff;
    }
  }

`
export default TvPage;