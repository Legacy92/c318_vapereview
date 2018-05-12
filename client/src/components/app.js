import React from 'react';
import {Route} from "react-router-dom";
import '../assets/css/app.css';
import {Route} from "react-router-dom";
import UserSignInModal from "./user-sign-in-modal"
import logo from '../assets/images/logo.svg';
import LandingPage from "./landing-page";
import Test from "./test";

const App = () => (
    <div>
        <div className="app">
            <img src={logo} className="logo rotate"/>
            <h1>Welcome to React</h1>
            <Route path="/user-sign-in" component={UserSignInModal}/>
            <Route exact path="/" component={LandingPage}/>
            <Test/>
        </div>
    </div>
);

export default App;
