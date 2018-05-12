import React from 'react';
import { Route } from 'react-router-dom';
import '../assets/css/app.css';
import logo from '../assets/images/logo.svg';
import Test from "./test";
import Nav from './nav';
import CreateAccount from './create_account_modal';
import AddReview from './add_review';
import HambugerMenu from './hamburger_menu';

const App = () => (
    <div>
        <div className="app">
            <Route path = "/hamburger_menu" compnent = {HambugerMenu}/>
            <Route path = "/add_review" component = {AddReview}/>
            <Route path = "/create_account_modal" component = {CreateAccount}/>
            <img src={logo} className="logo rotate"/>
            <h1>Welcome to React</h1>
            <Test/>
        </div>
    </div>
);

export default App;
