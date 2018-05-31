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
        const {juice_id}  = this.props.match.params;

        if(juice_id !== 'random'){
            this.props.singleItem(juice_id);
            this.props.singleItemReviews(juice_id);
            this.props.getChartData(juice_id);
        }else{
            this.getRandomJuice();
            this.props.getChartData(juice_id)
        }
    }

    handleHomeButton(){
        this.props.history.push(`/`);
    }

    handleAddReviewClick() {
        const {juice_id} = this.props.match.params;
        this.props.history.push(`/add-review/${juice_id}`);
    }

    handleBackButton() {
        const searchTerm = this.props.searchTerm;
        this.props.history.push(`/multiple-results/${searchTerm}`)
    }

    handleManufacturerNameClick () {
        // console.log("Manufacturer Clicked");
    }

    async getRandomJuice(){
        await this.props.getRandomJuice();

        const { id } = this.props.singleItemInfo;

        this.props.history.push(`/single-results/${id}`);

        this.props.singleItemReviews(id);
    }

    render(){
        let juiceData = [];

        const { chartData }= this.props

        const flavorElements = Object.keys(chartData).map(key => {
            return (
                <div key={key} className={`${key} chartText align-middle`} style={{height:`${chartData[key]}%`}}>{key}</div>
            )
        });

        if(this.props.singleItemInfo) {

            const {singleItemInfo: {name, manufacturer_name, manufacturer_site, manufacturer_description, rating}} = this.props
            
            return (
                <div className="single-results-body">
                    <h1 className = "single-results-header titanicFont display-4  goldenFont">Your Juice</h1>
                    <div className="single-results-item col-10 offset-1  card rounded  my-3">
                        <div className="row">
                            <div className="col-md-4 col-sm-12 col-12">
                                <div className="product-image single-results-image-container">
                                    <div className="juice-bottle-wrapper rounded" >
                                        <div className="juice-bottle-colors">
                                            {flavorElements}
                                        </div>
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
                                <div>
                                    <h5 onClick={this.handleManufacturerNameClick.bind(this)} className="manufacturer"><a href={manufacturer_site}>{manufacturer_site}</a></h5>
                                </div>
                                <div className="single-results-stars-container">
                                    <ReactStars className="single-results-stars stars" size={20} edit={false} count={5} value={rating} color1="grey" color2="#ffc900"/>
                                </div>
                                <div className="single-results-description ">
                                    <p className="single-results-item-text">{manufacturer_description}</p>
                                </div>
                            </div>

                            <div className="single-results-button col-md-12">
                                <button className="mx-2" onClick={this.handleAddReviewClick.bind(this)}>Add Review</button>
                                {
                                    this.props.searchTerm
                                        ? <button onClick={this.handleBackButton.bind(this)}>Back</button>
                                        : <button onClick={this.handleHomeButton.bind(this)}>Back</button>
                                }
                            </div>
                        </div>
                    </div>
                    <JuiceReviews/>
                </div>
            );
        }
    }
}

function mapStateToProps(state) {
    return {
        juice: state.juiceInfo.juice,
        randomJuice: state.juiceInfo.randomJuice,
        singleItemInfo:state.juiceInfo.singleItemInfo,
        searchTerm:state.juiceInfo.searchTerm,
        chartData:state.juiceInfo.chartData
    };
}

export default connect(mapStateToProps, actions)(SingleResults);
