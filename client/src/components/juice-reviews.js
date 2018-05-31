import React from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import * as actions from "../actions";
import ReactStars from "react-stars";
import { timeFormat } from "../helpers";
import types from "../actions/types";

const JuiceReviews = props => {
    let reviewElements = [];

    if (props.singleItemReviewsData) {

        const ReviewInfo = props.singleItemReviewsData;
        console.log(props.singleItemReviewsData);
        reviewElements = ReviewInfo.map((item, index) => {
            const {id, rating, review, created, username} = item;
            return (
                <div key={index} className=" juice-review-container card my-4 col-10 offset-1 ">
                    <div className="juice-reviews-stars-container">
                        <ReactStars className="juice-reviews-stars stars " size={20} edit={false} count={5} value={rating} color1="grey" color2="#ffc900"/>
                    </div>
                    <h5>By: {username}</h5>
                    <h5>{timeFormat(created)}</h5>
                    <h5>{review}</h5>
                </div>
            );
        });
    }
    return <div>{reviewElements}</div>;
}

function mapStateToProps(state) {
    return {
        singleItemReviewsData: state.juiceInfo.singleItemReviewsData
    }
}

export default connect(mapStateToProps, actions)(JuiceReviews);
