import React, { Component, Fragment } from 'react';
import HamburgerMenu from './hamburger-menu';


class Header extends Component {
    render() {
        return (
            <div className = "header-container">
                <HamburgerMenu/>
                <h3 className = "header-logo">Juice Query</h3>
                <button id = "header-sign-in" className = "btn btn-success">Sign In</button>
            </div>
        )
    }
}

export default Header;