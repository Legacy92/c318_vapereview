import React, { Component, Fragment } from 'react';
import HamburgerMenu from './hamburger-menu';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../actions';

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

    renderAuthLinks(){
        const { auth, signOut } = this.props;
        if(auth){
            return (
                <li className="nav-item">
                    <Link className="nav-link nav-link-text" to="/" onClick={signOut}>Sign Out</Link>
                </li>
            );
        }

        return (
            <Fragment>
                <li className="nav-item">
                    <Link className="nav-link nav-link-text" to="/create-account-modal" onClick={this.toggleNav}>Create Account</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link nav-link-text" to="/user-sign-in" onClick={this.toggleNav}>Sign In</Link>
                </li>
            </Fragment>
        );
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
                    <a className=" d-md-none mx-auto titanicFont h1 headerTitle goldenFont" href="/">Juice Query</a>
                    <div className={btnClass} id="navbarContent">
                        <ul className="navbar-nav  nav-fill w-100 align-items-start">
                            <li className="nav-item">
                            <Link className="nav-link nav-link-text " to="/" onClick={this.toggleNav}>Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link nav-link-text" to="/add-product" onClick={this.toggleNav}>Add Product</Link>
                            </li>
                            {this.renderAuthLinks()}
                        </ul>
                    </div>
                </nav>
            </Fragment>
        )
    }
}

function mapStateToProps(state){
    return {
        auth: state.user.auth
    }
}

export default connect(mapStateToProps, { signOut })(Header);
