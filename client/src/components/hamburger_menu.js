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
        super(props)



    }

    render() {
        return (
        <div className="hamburger-container">
            <h1>test hamburger</h1>
            <ul>
                <li>
                    <Link to="/add-review">Add Review</Link>
                </li>
                <li>
                    <Link to="/multiple-results">Multiple Results</Link>
                </li>
                <li>
                    <Link to="/single-results">Single Results</Link>
                </li>
                <li>
                    <Link to="/add-product">Add Product</Link>
                </li>
                <li>
                    <Link to="/create_account_modal">Create Account Modal</Link>
                </li>
                <li>
                    <Link to="/advanced-search">Advanced Search</Link>
                </li>
                <li>
                    <Link to="/user-sign-in">User Sign In</Link>
                </li>
            </ul>

        </div>
        )
    }

}

export default HamburgerMenu;

