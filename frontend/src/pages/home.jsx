import React from "react";
import { useState, useEffect } from "react";
import Header from './../components/header';
import coverImage from '../components/assets/home.jpg'
import movieTitle from '../components/assets/homeTitle.webp'
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai"
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, fetchMovies, reset } from './../features/movies/movieSlice';
import { toast } from 'react-toastify';
import Spinner from './../components/assets/spinner';
import Slider from './../components/slider';

const Home = () => {

    const [isScrolled, setScrolled] = useState(false)

    window.onscroll = () => {
        setScrolled(window.pageYOffset === 0 ? false : true);
        return () => (window.onscroll = null)
    }

    const { movies, genresLoaded, isLoading, isError, isSuccess, message } = useSelector((state) => state.netflix);

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        return () => {
            if (isSuccess) {
                dispatch(reset())
            }
        }
    }, [dispatch, isSuccess])

    useEffect(() => {
        dispatch(getGenres());
    }, [dispatch]);

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        if (genresLoaded) {
            dispatch(fetchMovies({ type: "all" }));
        }
    }, [genresLoaded]);

    if (isLoading) return <Spinner />

    return (
        <Container>
            <Header isScrolled={isScrolled} />
            <div className="hero">
                <img className="background-image" src={coverImage} alt="cover" />
                <div className="container">
                    <div className="logo">
                        <img src={movieTitle} alt="Home-title" />
                    </div>
                    <div className="buttons flex">
                        <button onClick={() => navigate('/player')} className="flex j-center a-center">
                            <FaPlay /> Play
                        </button>
                        <button className="flex j-center a-center">
                            <AiOutlineInfoCircle /> More Info
                        </button>
                    </div>
                </div>
            </div>

            <Slider movies={movies} />
        </Container>

    );
}

const Container = styled.div`
  background-color: #000000;
  .hero {
    position: relative;
    .background-image {
        filter: brightness(60%);
    }img {
        height: 100vh;
        width: 100vw;
        @media screen and (max-width: 768px) {
          width: 100vw;
          height: 60vh;
          object-fit: cover;
          }
    }
    .container {
        position:absolute;
        bottom: 5rem;
        .logo {
           img {
            width: 100%;
            height: 100%;
            margin-left: 5rem;
            @media screen and (max-width: 768px) {
                width: 50%;
                height: 50%;
                margin-left: 2rem;
            }
           }
        }

        .buttons {
          margin: 5rem;
          gap: 2rem;
          @media screen and (max-width: 768px) {
            margin: 2rem;
        }
        button {
            font-size: 1.4rem;
            gap: 1rem;
            border-radius: 0.2rem;
            padding: 0.5rem;
            padding-left: 2rem;
            padding-right: 2.4rem;
            border: none;
            cursor: pointer;
            transition: 0.3s ease-in-out;
            &:hover{
                opacity: 0.8;
            }
            &:nth-of-type(2) {
                background-color: rgba(109, 109, 110, 0.7);
                color: white;
                svg {
                    font-size: 1.8rem;
                }
            }
        }
        }
    }
     
  }

`
export default Home;
