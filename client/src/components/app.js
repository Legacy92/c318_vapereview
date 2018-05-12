import React from 'react';
import { Route } from 'react-router-dom';
import '../assets/css/app.css';
import logo from '../assets/images/logo.svg';
import Test from "./test";
import Nav from './nav';
import CreateAccount from './create_account_modal';
import AddReview from './add_review';

const App = () => (
    <div>
        <div className="app">

            <img src={logo} className="logo rotate"/>
            <h1>Welcome to React</h1>
            <Test/>
        </div>
    </div>
);

export default App;
