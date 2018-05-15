import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class MultipleResults extends Component {
    render() {
        return (
            <div>
                <h1>Multiple Results</h1>
                <Link to = "/flavor-modal">Advanced Search</Link>
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
            </div>
        )
    }
}

export default MultipleResults;