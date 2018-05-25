import React, { Component } from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import * as actions from "../actions";
import types from "../actions/types";

class SingleResults extends Component {


    componentDidMount(){
        // // this.getJuiceData();
        console.log("Single-product-props:", this.props);
        const {juiceId}  = this.props.match.params;
        this.props.singleItem({juiceId});
        console.log("merge comment");

    }

    async getJuiceData(){
        const response = await axios.get("/api/single-results");
        console.log("Juice Data:", response);
    }
    render(){

        console.log(this.props);


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
        randomJuice: state.juiceInfo.randomJuice,
        singleItemInfo:state.juiceInfo.singleItemInfo
    };

}

export default connect(mapStateToProps, actions)(SingleResults);

// export function singleItem() {
//     const response = axios.get("/api/single-juice");
//
//     return {
//         type: types.SINGLE_ITEM,
//         payload: response
//     }
// }
