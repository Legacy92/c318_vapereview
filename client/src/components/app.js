import React from 'react';
import '../assets/css/app.css';
import {Route} from "react-router-dom";
import logo from '../assets/images/logo.svg';
import AdvancedSearchModal from "./advanced-search-modal";
import Test from "./test";

const App = () => (
    <div>
        <div className="app">
            <img src={logo} className="logo rotate"/>
            <h1>Welcome to React</h1>
            <Route path="/advanced-search" component={AdvancedSearchModal}/>
            <Test/>
        </div>
    </div>
);

export default App;
