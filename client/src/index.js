import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Provider} from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import {createStore, applyMiddleware} from "redux";
import promise from "redux-promise";
import App from './components/app';
import rootReducer from "./reducers/index";
import think from './middleware/think';
import types from './actions/types';


const store = createStore( rootReducer, {}, applyMiddleware(think, promise));

if(localStorage.getItem('token')){
    store.dispatch({
        type: types.SIGN_IN
    });
}

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root')
);
