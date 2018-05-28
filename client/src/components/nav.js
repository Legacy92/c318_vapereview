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
        console.log(btnClass)
        return (
            <Fragment>
                <nav className="navbar fixed-top navbar-expand-sm navbar-dark bg-dark">
                    <button onClick={this.toggleNav} className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarContent">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <a className="navbar-brand mx-auto" href="/">Juice Query</a>
                    <div className={btnClass} id="navbarContent">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                            <Link className="nav-link" to="/" onClick={this.toggleNav}>Home</Link>
                            </li>
                            <li>
                                <Link className="nav-link" to="/add-product" onClick={this.toggleNav}>Add Product</Link>
                            </li>
                            <li>
                                <Link className="nav-link" to="/create-account-modal" onClick={this.closeNav}>Create Account</Link>
                            </li>
                            <li>
                                <Link className="nav-link" to="/user-sign-in" onClick={this.closeNav}>Sign In</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </Fragment>
        )
    }
}

export default Header;