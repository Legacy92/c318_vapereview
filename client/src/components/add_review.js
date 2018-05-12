import React, { Component } from 'react';
import Nav from './nav';

class AddReview extends Component {
    render() {
        return (
        <div className="add-review">
            <Nav/>
            <h1>Add review test page</h1>
            <a href=""></a>
            <button type = "button" className = "btn btn-success">Submit</button>
        </div>
        )
    }
}

export default AddReview;