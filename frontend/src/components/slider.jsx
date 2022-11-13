import React from "react";
import CardSlider from "./cardSlider";

const Slider = ({ movies }) => {

    const sliceMovies = (start, end) => {
        return movies.slice(start, end)
    }


    return (
        <div>
            <CardSlider title="Trending" data={sliceMovies(0, 10)} />
            <CardSlider title="Just Released" data={sliceMovies(10, 20)} />
            <CardSlider title=" Engaging Movies" data={sliceMovies(20, 30)} />
            <CardSlider title="Most Popular" data={sliceMovies(30, 40)} />
            <CardSlider title="Action movies" data={sliceMovies(40, 50)} />
            <CardSlider title="Epics" data={sliceMovies(50, 60)} />
        </div>
    );
}

export default Slider;