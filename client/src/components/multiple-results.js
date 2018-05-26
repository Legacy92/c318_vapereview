import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { connect } from "react-redux";
import * as actions from "../actions";
import vapeImage from "../assets/images/vape-image.jpeg"


class MultipleResults extends Component {

    componentDidMount() {
        // this.getReviewData();
        const { searchTerm } = this.props.match.params;
        console.log('TERM:', searchTerm);

        if(searchTerm){
            this.props.landingPageSearch({input: searchTerm});
        }else{
            this.props.browseAllJuices();
        }
    }

    handleProductClick(id){
        this.props.history.push(`/single-results/${id}`);

    }

    async getReviewData() {
        const response = await axios.get("/api/multiple-results");
        console.log("Review Data:", response);
    }

    render() {

        console.log(this.props);
        let juiceElements = [];
        if (this.props.all) {
            const juiceInfo = this.props.all;

            juiceElements = juiceInfo.map((item, index) => {
                const { name, manufacturer_name, manufacturer_site, manufacturer_description, id, rating } = item;
                return (

                    <div onClick={() => this.handleProductClick(id)} key={index} className="col-12 col-sm-5 bg-dark card my-3 mx-2">
                        <div className="prod-info-main prod-wrap clearfix">

                                <div className="col-md-7 col-sm-12 col-xs-12">
                                    <div className="product-detail">
                                        <h5 className="name">
                                            <a href="#">
                                                {name}
                                            </a>
                                        </h5>
                                        <p className="price-container">
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
                );
            });
        }
        return (
            <div>
                <h1>Multiple Results</h1>
                <div className="row">
                    {juiceElements}
                </div>


                <Link className="btn" to="/flavor-modal">Advanced Search</Link>
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        all: state.juiceInfo.all,
        juiceId: state.juiceInfo.juiceId
    };

}

export default connect(mapStateToProps, actions)(MultipleResults);