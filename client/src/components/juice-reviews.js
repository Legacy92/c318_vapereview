import React, { Component } from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import * as actions from "../actions";
import ReactStars from "react-stars";

import types from "../actions/types";


class JuiceReviews extends Component {


    render() {
        console.log("Juice Review Props:", this.props);

        let reviewElements = [];
        if (this.props.singleItemReviewsData) {
            const ReviewInfo = this.props.singleItemReviewsData;

            reviewElements = ReviewInfo.map((item, index) => {
                const {id, rating, review} = item;
                return (
                    <div key={index} className=" juice-review-container card my-4 col-10 offset-1 ">
                        <div className="juice-reviews-stars-container">
                            <ReactStars className="juice-reviews-stars" size={20} edit={false} count={5} value={rating} color1="grey" color2="#a67c00"/>
                        </div>
                        <h1>{id}</h1>
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