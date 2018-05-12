import React, { Component } from 'react';
import { Link } from 'react';
import { Route } from 'react-router-dom';
import Nav from './nav';

class AddReview extends Component {
    render() {
        return (
        <div className="add-review">
            <Nav/>
            {/* <Link to = "/add-flavor-modal" /> */}
            <div className="star-rating">
                <h2>Rating:</h2>
                <div id = "app"/>
                <span className = "fa fa-star"></span>
            </div>
            <div className = "add-review">
                <h2>Add Review:</h2>
                <textarea rows="4" cols="50"/>
            </div>
            <button type = "button" className = "btn btn-success">Submit</button>
        </div>
        )
    }
}

export default AddReview;