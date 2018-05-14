import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LandingPage from "./landing-page";
import AdvancedSearchModal from "./advanced-search-modal";
import AddProduct from "./add_product";
import AddReview from "./add_review";
import UserSignInModal from "./user-sign-in-modal";
import MultipleResults from "./multiple_results";
import SingleResults from "./single_results";
import CreateAccount from "./create_account_modal";

class HamburgerMenu extends Component {

    constructor(props) {
        super(props);

        this.state = {
            show: false
        };

        this.closeNav = this.closeNav.bind(this);

    }

    closeNav() {
        const {show} = this.state;
        this.setState({
            show: !show
        });
    }


    render() {
        const {show} = this.state;

        const button = (
            <div className="menu-button" onClick={this.closeNav}>
                <div></div>
                <div></div>
            </div>
        );


        if (show) {
            return (
                <div className="hamburger-container">
                    <h1>hamburger nav menu</h1>
                    {button}
                    <ul>
                        <li>
                            <Link to="/" onClick={this.closeNav}>Home</Link>
                        </li>
                        <li>
                            <Link to="/add-review" onClick={this.closeNav}>Add Review</Link>
                        </li>
                        <li>
                            <Link to="/multiple-results" onClick={this.closeNav}>Multiple Results</Link>
                        </li>
                        <li>
                            <Link to="/single-results" onClick={this.closeNav}>Single Results</Link>
                        </li>
                        <li>
                            <Link to="/add-product" onClick={this.closeNav}>Add Product</Link>
                        </li>
                        <li>
                            <Link to="/create-account-modal" onClick={this.closeNav}>Create Account Modal</Link>
                        </li>
                        <li>
                            <Link to="/advanced-search" onClick={this.closeNav}>Advanced Search</Link>
                        </li>
                        <li>
                            <Link to="/user-sign-in" onClick={this.closeNav}>User Sign In</Link>
                        </li>
                    </ul>

                </div>
            );
        }

        return (
            <div>
                {button}
            </div>
        );

    }
}

export default HamburgerMenu;
