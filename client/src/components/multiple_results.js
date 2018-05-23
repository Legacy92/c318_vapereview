import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";


class MultipleResults extends Component {

    componentDidMount(){
        // this.getReviewData();
    }

    async getReviewData(){
        const response = await axios.get("/api/multiple-results");
        console.log("Review Data:", response);
    }

    render() {
        return (
            <div>
                <h1>Multiple Results</h1>
                <Link className="btn" to = "/flavor-modal">Advanced Search</Link>
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
            </div>
        )
    }
}

export default MultipleResults;