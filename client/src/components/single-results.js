import React, { Component } from 'react';
import {Link} from "react-router-dom";
import axios from "axios";

class SingleResults extends Component {
    render() {
        return (
            <div>
                <h1>Single Results</h1>
                <Link className="btn" to="/add-review">Add Review</Link>
            </div>
        )
    }

    componentDidMount(){
        this.getJuiceData();
    }

    async getJuiceData(){
        const response = await axios.get("/api/single-results");
        console.log("Juice Data:", response);
    }
}



export default SingleResults;