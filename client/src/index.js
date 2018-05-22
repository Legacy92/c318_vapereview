import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Provider} from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import {createStore, applyMiddleware} from "redux";
import promise from "redux-promise";
import App from './components/app';
import rootReducer from "./reducers/index";


const store = createStore( rootReducer, {}, applyMiddleware(promise));


ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root')
);
