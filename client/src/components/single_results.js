import React, { Component } from 'react';
import {Link} from "react-router-dom";

class SingleResults extends Component {
    render() {
        return (
            <div>
                <h1>Single Results</h1>
                <Link to="/add-review">Add Review</Link>
            </div>
        )
    }
}

export default SingleResults;