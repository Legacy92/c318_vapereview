import React, { Component } from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import * as actions from "../actions";
import types from "../actions/types";
import JuiceReviews from "./juice-reviews";

class SingleResults extends Component {

    componentDidMount(){
        // // this.getJuiceData();
        console.log("Single-product-props:", this.props);
        const {juiceId}  = this.props.match.params;
       
        if(juiceId !==':juiceId'){
            this.props.singleItem({juiceId});
            this.props.singleItemReviews({juiceId});
        }else{
            this.getRandomJuice();
        }
    }

    async getRandomJuice(){
        await this.props.getRandomJuice();
        const juiceId = this.props.singleItemInfo[0].id;

        console.log('Get Random Juice', juiceId);
            
        await this.props.singleItemReviews(juiceId);
    }

    async getJuiceData(){
        const response = await axios.get("/api/single-results");
        console.log("Juice Data:", response);
    }
    render(){
        console.log(this.props);

        let juiceData = [];

        if(this.props.singleItemInfo[0]) {

            const juiceData = this.props.singleItemInfo[0];

            console.log('Juice Data:', juiceData);
            const {name, manufacturer_name, manufacturer_site, manufacturer_description, rating} = juiceData;
            console.log(name, manufacturer_description, manufacturer_site, manufacturer_name);
            return (
                <div>
                    <div className="col-xs-8 offset-1  card bg-dark">
                        <div className="prod-info-main prod-wrap clearfix">
                            <div className="row">
                                <div className="col-md-5 col-sm-12 col-xs-12">
                                    <div className="product-image">
                                    <span className="tag2 hot">

                            </span>
                                    </div>
                                </div>
                                <div className="col-md-7 col-sm-12 col-xs-12">
                                    <div className="product-detail">
                                        <h5 className="name">
                                            <a href="#">
                                                {name}
                                            </a>
                                        </h5>
                                        <p className="price-container">
                                            <span>$24.99</span>
                                        </p>
                                        <span className="tag1"></span>
                                    </div>
                                    <div className="description">
                                        <p>{manufacturer_description}</p>
                                    </div>
                                    <div className="product-info smart-form">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <a href="javascript:void(0);" className="btn btn-danger">Add to cart</a>
                                                <a href="javascript:void(0);" className="btn btn-info">More info</a>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="rating">Rating:{rating}
                                                    <label htmlFor="stars-rating-5"><i className="fa fa-star text-danger"></i></label>
                                                    <label htmlFor="stars-rating-4"><i className="fa fa-star text-danger"></i></label>
                                                    <label htmlFor="stars-rating-3"><i className="fa fa-star text-danger"></i></label>
                                                    <label htmlFor="stars-rating-2"><i className="fa fa-star text-warning"></i></label>
                                                    <label htmlFor="stars-rating-1"><i className="fa fa-star text-warning"></i></label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <JuiceReviews/>
                </div>

            )


        }
        if(!this.props.randomJuice){

            console.log('response not yet loaded');
        }else{
            return (
                <h1>Loading</h1>
            )

        }
    }

}

function mapStateToProps(state) {
    return {
        all: [],
        juice: state.juiceInfo.juice,
        randomJuice: state.juiceInfo.randomJuice,
        singleItemInfo:state.juiceInfo.singleItemInfo,
        randomJuiceId: state.juiceInfo.randomJuiceId
    };

}

export default connect(mapStateToProps, actions)(SingleResults);

