import React from "react";
import { useState, useEffect } from "react";
import Header from './../components/header';
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, fetchMovies } from './../features/movies/movieSlice';
import Slider from './../components/slider';
import NotAvailable from './../components/notAvailable';


const MoviePage = () => {

    const [isScrolled, setScrolled] = useState(false)

    const { genres, movies, genresLoaded } = useSelector((state) => state.netflix);

    // const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getGenres());
    }, []);

    useEffect(() => {
        if (genresLoaded) dispatch(fetchMovies({ genres, type: "movie" }));

    });

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
    .not-available {
        text-align: center;
        color: #ffffff;
        margin-top: 4rem;
    }
  }
`
export default MoviePage;