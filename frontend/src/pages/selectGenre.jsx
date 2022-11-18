import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { fetchMoviesByGenres } from './../features/movies/movieSlice';
import Spinner from './../components/assets/spinner';

const SelectGenre = ({ genres, type }) => {
    const dispatch = useDispatch()
    const { isLoading } = useSelector((state) => state.netflix)

    if (isLoading) return <Spinner />

    return (
        <select onChange={e => {
            dispatch(fetchMoviesByGenres({ genre: e.target.value, type }))
        }} >
            {genres.map((genre) => {
                return (
                    <option value={genre.id} key={genre.id}>{genre.name}</option>
                )
            })}
        </select>
    );
}

export default SelectGenre;