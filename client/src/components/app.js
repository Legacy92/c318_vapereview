import React from 'react';
import {Route} from "react-router-dom";
import '../assets/css/app.css';
import AdvancedSearchModal from "./advanced-search-modal";
import UserSignInModal from "./user-sign-in-modal"
import logo from '../assets/images/logo.svg';
import LandingPage from "./landing-page";
import Test from "./test";
import Header from './nav';
import CreateAccount from './create_account_modal';
import AddReview from './add_review';
import HambugerMenu from './hamburger_menu';

const App = () => (
    <div>
        <div className="app">
            <Header/>
            <Route path = "/hamburger_menu" compnent = {HambugerMenu}/>
            <Route path = "/add_review" component = {AddReview}/>
            <Route path = "/create_account_modal" component = {CreateAccount}/>
            <h1>Welcome to React</h1>
            <Route path="/advanced-search" component={AdvancedSearchModal}/>
            <Route path="/user-sign-in" component={UserSignInModal}/>
            <Route exact path="/" component={LandingPage}/>
            <Test/>
        </div>
    </div>
);

export default App;
