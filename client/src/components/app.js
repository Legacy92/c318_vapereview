import React from 'react';
import '../assets/css/app.css';
import {Route} from "react-router-dom";
import UserSignInModal from "./user-sign-in-modal"
import logo from '../assets/images/logo.svg';
import Test from "./test";

const App = () => (
    <div>
        <div className="app">
            <img src={logo} className="logo rotate"/>
            <h1>Welcome to React</h1>
            <Route path="/user-sign-in" component={UserSignInModal}/>
            <Test/>
        </div>
    </div>
);

export default App;
