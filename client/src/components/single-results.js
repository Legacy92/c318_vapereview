import React, { Component } from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
import ReactStars from "react-stars";
import { connect } from "react-redux";
import * as actions from "../actions";
import types from "../actions/types";
import JuiceReviews from "./juice-reviews";
import juiceBottle from "../assets/images/vape-juice-bottle-transparent-smoke.png";

class SingleResults extends Component {

    componentDidMount(){
        // // this.getJuiceData();
        console.log("Single-product-props:", this.props);
        const {juice_id}  = this.props.match.params;
       
        if(juice_id !==':juice_id'){
            this.props.singleItem({juice_id});
            this.props.singleItemReviews({juice_id});

        }else{
            this.getRandomJuice();
        }


    }

    handleAddReviewClick() {
        const {juice_id} = this.props.match.params;
        console.log(this.props.singleItemInfo);
        this.props.history.push(`/add-review/${juice_id}`);

    }

    handleBackButton() {
        console.log("Back Button Clicked");
        this.props.history.go(-1);

    }

    handleManufacturerNameClick () {
        console.log("Manufacturer Clicked");

}

    async getRandomJuice(){
        await this.props.getRandomJuice();
        const juice_id = this.props.singleItemInfo[0].id;
        this.props.match.params = {'juice_id':juice_id};
        this.props.match.url= `/single-results/:${juice_id}`;
        console.log('Get Random Juice', juice_id);
            
        await this.props.singleItemReviews(juice_id);
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
                <div className="single-results-display">
                    <div className="single-results-item col-10 offset-1  card rounded  my-3">
                            <div className="row">
                                <div className="col-md-4 col-sm-12 col-12">
                                    <div className="product-image single-results-image-container">
                                        <div className="juice-bottle-wrapper rounded" >
                                            <img  className="img-rounded single-results-image" src={juiceBottle}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-7 col-sm-12 col-12 single-results-written-content">
                                    <div>
                                        <h2 className="single-results-name">{name}</h2>
                                    </div>
                                    <div>
                                        <h3 onClick={this.handleManufacturerNameClick.bind(this)} className="manufacturer">{` By: ${manufacturer_name}`}</h3>
                                    </div>
                                    <div className="single-results-stars-container">
                                        <ReactStars className="single-results-stars stars" size={20} edit={false} count={5} value={rating} color1="grey" color2="#ffc900"/>
                                    </div>
                                    <div className="single-results-description ">
                                        <p className="single-results-item-text">{manufacturer_description} Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ad adipisci animi dolor harum nemo quae quia velit veniam vero? Enim in ipsum perferendis? Delectus dicta facere illo molestiae recusandae rem, repellat sunt suscipit voluptatibus!</p>
                                    </div>
                                </div>

                                <div className="col-md-12">
                                    <button className="mx-2 rounded" onClick={this.handleAddReviewClick.bind(this)}>Add Review</button>
                                    <button onClick={this.handleBackButton.bind(this)}>Back To Results</button>
                                </div>
                            </div>
                    </div>
                    <JuiceReviews/>
                </div>

            )


        }
        if(!this.props.randomJuice){
            console.log('response not yet loaded');
            return <h1>Loading</h1>;
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
        singleItemInfo:state.juiceInfo.singleItemInfo
    };

}

export default connect(mapStateToProps, actions)(SingleResults);

{/*<div className="rating">Rating:{rating}*/}
    {/*<label htmlFor="stars-rating-5"><i className="fa fa-star text-danger"></i></label>*/}
    {/*<label htmlFor="stars-rating-4"><i className="fa fa-star text-danger"></i></label>*/}
    {/*<label htmlFor="stars-rating-3"><i className="fa fa-star text-danger"></i></label>*/}
    {/*<label htmlFor="stars-rating-2"><i className="fa fa-star text-warning"></i></label>*/}
    {/*<label htmlFor="stars-rating-1"><i className="fa fa-star text-warning"></i></label>*/}
{/*</div>*/}