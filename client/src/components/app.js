import React from 'react';
import {Route} from "react-router-dom";
import 'materialize-css/dist/css/materialize.min.css';
import '../assets/css/app.css';
import AdvancedSearchModal from "./advanced-search-modal";
import UserSignInModal from "./user-sign-in-modal"
import LandingPage from "./landing-page";
import Header from './nav';
import CreateAccount from './create_account_modal';
import AddReview from './add_review';
import HambugerMenu from './hamburger_menu';
import AddProduct from "./add_product"
import MultipleResults from "./multiple_results";
import SingleResults from "./single_results";
import FlavorModal from "./flavor-modal";


import Test from "./test"




const App = () => (
    <div>
        <div className="app">
            <Header/>
            <Route path = "/multiple-results" component = {MultipleResults}/>
            <Route path = "/single-results" component = {SingleResults}/>
            <Route path = "/add-product" component = {AddProduct}/>
            <Route path = "/hamburger-menu" compnent = {HambugerMenu}/>
            <Route path = "/add-review" component = {AddReview}/>
            <Route path = "/create-account-modal" component = {CreateAccount}/>
            <Route path = "/advanced-search" component={AdvancedSearchModal}/>
            <Route path = "/user-sign-in" component={UserSignInModal}/>
            <Route exact path= "/" component={LandingPage}/>
            <Route path= "/test" component={Test}/>
            <Route path= "/add-product" component={Test}/>
            <Route path = "/flavor-modal" component = {FlavorModal}/>
        </div>
    </div>
);

export default App;
