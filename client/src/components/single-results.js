import React, { Component } from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import * as actions from "../actions";

class SingleResults extends Component {

    componentDidMount(){
        // // this.getJuiceData();
        console.log("Single-product-props:", this.props)
    }

    async getJuiceData(){
        const response = await axios.get("/api/single-results");
        console.log("Juice Data:", response);
    }
    render() {
        if(!this.props.randomJuice){
            console.log('response not yet loaded');
        }else{
            console.log("State Props from single results:", this.props.all, this.props.randomJuice);
            return (
                <div>
                    <h1>Single Results</h1>
                    <Link className="btn" to="/add-review">Add Review</Link>
                </div>
            )
        }
    }

}

function mapStateToProps(state) {
    return {
        all: [],
        juice: state.juiceInfo.juice,
        randomJuice: state.juiceInfo.randomJuice
    };

}

export default connect(mapStateToProps, actions)(SingleResults);
