import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {BrowserRouter as Router} from "react-router-dom";

import {createStore} from "redux";

import App from './components/app';
import rootReducer from "./reducers/index";

ReactDOM.render(
    <Provider store={createStore(rootReducer)}>
        <Router>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root')
);
