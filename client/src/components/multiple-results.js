import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import * as actions from "../actions";
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

        console.log(this.props);
        let juiceElements = [];
        if(this.props.all) {
            const juiceInfo = this.props.all;

             juiceElements = juiceInfo.map((item, index) => {
                const {name, manufacturer_name, manufacturer_site, manufacturer_description} = item;
                console.log(name, manufacturer_name, manufacturer_site, manufacturer_description);
                return (
                    <div key={index}>
                        <p>{name}</p>
                        <p>{manufacturer_name}</p>
                        <p>{manufacturer_description}</p>
                        <p>{manufacturer_site}</p>
                    </div>
                )
            });
        }
        return (
            <div>
                <h1>Multiple Results</h1>
                {juiceElements}

                <Link className="btn" to = "/flavor-modal">Advanced Search</Link>
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        all: state.juiceInfo.all,
        juice: state.juiceInfo.juice
    };

}



export default connect(mapStateToProps, actions)(MultipleResults);