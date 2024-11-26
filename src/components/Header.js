import React from 'react';
import { NavLink } from 'react-router-dom';
import { HomeImg } from '../utility/common';
import '../App.css'

const Header = () => {
    return (
        <div className="header">
            <div className="logo-container">
                <img
                    className="logo"
                    src={HomeImg}
                    alt="Logo"
                />
            </div>
            <div className="nav-items">
                <nav className="navbar">
                    <ul>
                        <li><NavLink to='/registration' activeClassName="active">Registration</NavLink></li>
                        <li><NavLink to='/login' activeClassName="active">Login</NavLink></li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Header;
