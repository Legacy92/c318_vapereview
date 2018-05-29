import React, { Component, Fragment } from 'react';
import HamburgerMenu from './hamburger-menu';
import { Link } from 'react-router-dom';



class Header extends Component {

    constructor(props) {
        super(props);

        this.state = {
            shown: false
        };

        this.toggleNav = this.toggleNav.bind(this);

    }

    toggleNav() {
        const {shown} = this.state;
        this.setState({
            shown: !shown
        });
    }

    render() {
        const {shown} = this.state;
        let btnClass = "collapse navbar-collapse";
        if(shown) {
            btnClass = "collapse navbar-collapse show";
        }
        return (
            <Fragment>
                <nav className="navbar header-container fixed-top navbar-expand-md navbar-dark blacker" >
                    <button onClick={this.toggleNav} className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarContent">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <a className=" d-md-none mx-auto titanicFont display-4 goldenFont" href="/">Juice Query</a>
                    <div className={btnClass} id="navbarContent">
                        <ul className="navbar-nav  nav-fill w-100 align-items-start">
                            <li className="nav-item">
                            <Link className="nav-link nav-link-text " to="/" onClick={this.toggleNav}>Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link nav-link-text" to="/add-product" onClick={this.toggleNav}>Add Product</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link nav-link-text" to="/create-account-modal" onClick={this.closeNav}>Create Account</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link nav-link-text" to="/user-sign-in" onClick={this.closeNav}>Sign In</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </Fragment>
        )
    }
}

export default Header;