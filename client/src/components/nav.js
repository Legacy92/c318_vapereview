import React, { Component } from 'react';
import { Link } from 'react';
import HamburgerMenu from './hamburger_menu';

class Header extends Component {
    render() {
        return (
            <div>
                <HamburgerMenu/>
                <h1>Header</h1>
                <button className = "btn btn-success">Sign In</button>
            </div>
        )
    }
}

export default Header;