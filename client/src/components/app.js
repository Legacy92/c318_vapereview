import React from 'react';
import { Route } from "react-router-dom";
import '../assets/css/app.css';
import AdvancedSearchModal from "./advanced-search-modal";
import UserSignIn from "./user-sign-in-modal"
import LandingPage from "./landing-page";
import Header from './nav';
import CreateAccount from './create-account-modal';
import AddReview from './add-review';
import HambugerMenu from './hamburger-menu';
import AddProduct from "./add-product"
import MultipleResults from "./multiple-results";
import SingleResults from "./single-results";
import FlavorModal from "./flavor-modal";


const App = () => (
    <div className="app"> 
        <Header />
        <div className="page-header mb-5"></div>
        <div className="container">
            <Route path="/multiple-results/:searchTerm" component={MultipleResults} />
            <Route path="/multiple-results-browse" component={MultipleResults} />
            <Route path="/single-results/:juiceId" component={SingleResults} />
            <Route path="/add-product" component={AddProduct} />
            <Route path="/hamburger-menu" compnent={HambugerMenu} />
            <Route path="/add-review" component={AddReview} />
            <Route path="/create-account" component={CreateAccount} />
            <Route path="/advanced-search" component={AdvancedSearchModal} />
            <Route path="/user-sign-in" component={UserSignIn} />
            <Route exact path="/" component={LandingPage} />
            <Route path="/flavor-modal" component={FlavorModal} />
        </div>
    </div>
);

export default App;
