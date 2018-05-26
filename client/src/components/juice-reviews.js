import React, { Component } from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import * as actions from "../actions";
import types from "../actions/types";


class JuiceReviews extends Component {


    render() {

        let reviewElements = [];
        if (this.props.singleItemReviewsData) {
            const ReviewInfo = this.props.singleItemReviewsData;

            reviewElements = ReviewInfo.map((item, index) => {
                const {id, rating, review} = item;
                return (
                    <div key={index} className="card my-3">
                        <h1>{id}</h1>
                        <h2>{rating}</h2>
                        <h3>{review}</h3>
                    </div>
                )

            });

        }
        return (
            <div>{reviewElements}</div>
        )
    }


}
function mapStateToProps(state) {
    return {
        singleItemReviewsData: state.juiceInfo.singleItemReviewsData
    }
}


export default connect(mapStateToProps, actions)(JuiceReviews)