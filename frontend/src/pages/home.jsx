import React from "react";
import { useState } from "react";
import Header from './../components/header';

const Home = () => {

    const [isScrolled, setScrolled] = useState(false)

    window.onscroll = () => {
        setScrolled(window.pageYOffset === 0 ? false : true);
        return () => (window.onscroll = null)
    }

    return (
        <Header isScrolled={isScrolled} />
    );
}

export default Home;