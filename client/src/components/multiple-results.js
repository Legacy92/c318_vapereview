import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { connect } from "react-redux";
import * as actions from "../actions";


class MultipleResults extends Component {

    componentDidMount(){
        // this.getReviewData();
    }

    async getReviewData(){
        const response = await axios.get("/api/multiple-results");
        console.log("Review Data:", response);
    }

    render() {
        if(!this.props.all){
            console.log('waiting on response for browse');
        }else{
        console.log('state on multiple results page:', this.props.all);
        return (
            <div>
                <h1>Multiple Results</h1>
                <Link className="btn" to = "/flavor-modal">Advanced Search</Link>
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
            </div>
        )
    }
    }
}

function mapStateToProps(state) {
    return {
        all: state.juiceInfo.all,
        juice: state.juiceInfo.juice
    };

}

export default connect(mapStateToProps, actions)(MultipleResults);