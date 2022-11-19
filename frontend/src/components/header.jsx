import React from 'react'
import styled from 'styled-components';
import logo from './assets/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { FaSearch, FaPowerOff } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice'
import menu from './assets/menu.svg'
import close from './assets/close.svg'


const Header = ({ isScrolled }) => {

    const menus = [
        { name: "Home", link: "/" },
        { name: "Tv shows", link: "/tv" },
        { name: "Movies", link: "/movies" },
        { name: "My List", link: "/mylist" },
    ]

    const [showSearch, setShowSearch] = useState(false)
    const [inputHover, setInputHover] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)

    useEffect(() => {
        if (!user) navigate('/login')

    }, [user, navigate])


    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/login')
    }

    const [toggle, setToggle] = useState(false)
    return (
        <Container>
            <nav className={`flex ${isScrolled ? 'scrolled' : ''}`}>

                <div className="left flex a-center">
                    <div className="logo-img flex a-center j-center">
                        <Link to='/'><img src={logo} alt="logo-img" /></Link> 
                    </div>

                    <ul className="links flex">
                        {menus.map((menu) => {
                            return (
                                <li key={menu.name}>
                                    <Link className="text" to={menu.link}>{menu.name}</Link>
                                </li>
                            )
                        })}
                    </ul>

                </div>
                <div className="right flex a-center">
                    <div className={`search ${showSearch ? "show-search" : ''}`}>
                        <button onFocus={() => setShowSearch(true)} onBlur={() => {
                            if (!inputHover) setShowSearch(false)
                        }}>
                            <FaSearch />
                        </button>

                        <input type="text"
                            placeholder="Search"
                            onMouseEnter={() => setInputHover(true)}
                            onMouseLeave={() => setInputHover(false)}
                            onBlur={() => {
                                setShowSearch(false);
                                setInputHover(false)
                            }}
                        />


                    </div>

                    <button onClick={onLogout}><FaPowerOff /></button>
                    <img className="menu-icon" src={toggle ? close : menu} alt="hamburger-menu" onClick={() => setToggle((prev) => !prev)} />

                    {/* smaller screen */}

                    <div className={`${toggle ? 'show-menu' : 'hide-menu'} flex sidebar`} >
                        <ul className="links flex">
                            {menus.map((menu) => {
                                return (
                                    <li key={menu.name}>
                                        <Link className="text" to={menu.link}>{menu.name}</Link>
                                    </li>
                                )
                            })}
                        </ul>



                    </div>


                </div>

            </nav>
        </Container>
    );
}


const Container = styled.div`
 .scrolled {
     background-color: black;
 }
 nav {
    position: sticky;
    top: 0;
    height: 6.5rem;
    width: 100%;
    justify-content: space-between;
    position: fixed; 
    z-index: 2;
    padding: 0 4rem;
    align-items: center;
    transition: 0.3s ease-in-out; 
  
    .left {
        gap: 2rem;
        .logo-img {
            @media screen and (max-width: 768px) {
                width: 5%;
                height: 5%;
                margin-left: 0.5rem;
            }
            
        img {
            height: 4rem;
        }
        }
        .links {
            list-style-type: none;
            gap:2rem;
            @media screen and (max-width: 768px) {
               display: none;
            }
          li {
            a {
               color: white;
               text-decoration: none;
            }
          }
        }
    }
    .right {
        gap: 1rem;

        @media screen and (max-width: 768px) {
            .menu-icon {
                display: block;
            }
        }
        .menu-icon {
            display: none;
        }
        @media screen and (max-width: 768px) {
            .menu-icon {
                display: block;
                    width: 30px;
                    height: 30px;
                
            }
        }
        button {
            background-color: transparent;
            border: none;
            cursor: pointer;
            &:focus {
                outline: none;
            }
            svg {
                color: #f34242;
                font-size: 1.2rem;
            }
        }
        .search {
            display: flex;
            gap: 0.4rem;
            align-items: center;
            justify-content: center;
            padding: 0.2rem;
            padding-left: 0.5rem;
        button {
            background-color: transparent;
        svg {
            color: white;
        }
        }
        input {
            width: 0;
            opacity: 0;
            visibility: hidden;
            transition: 0.3s ease-in-out;
            background-color: transparent;
            border: none;
            color: white;
            &:focus {
                outline: none;
            }
        }
      
    }
    .show-search {
        border: 1px solid #fff;
        background-color: rgba(0, 0, 0, 0.6);
        input {
            width: 100%;
            opacity: 1;
            visibility: visible;
            padding: 0.3rem; 
        }
    }
}
.show-menu {
    .links {
        position: absolute;
        display: block;
        flex-direction: column;
        padding: 1.5rem;
        right: 0;
        background: linear-gradient(144.39deg,
            #ffffff -278.56%,
            #6d6d6d -78.47%,
            #11101d 91.61%);
            top: 5rem;
            margin: 16px 8px;
            min-width: 140px;
            border-radius: 0.7rem;
            list-style-type: none;
           .text {
            text-decoration: none;
            color: #ffffff;
            font-size: 1.2rem;   
           }
           li {
            font-family: Poppins, sans-serif;
            font-weight: 400;
            cursor: pointer;
            margin-top: 12px;
            margin-bottom: 12px;
        }
         
    }
  
}
.hide-menu {
    display: none;
}
}

`;

export default Header;