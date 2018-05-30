import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { connect } from "react-redux";
import * as actions from "../actions";
import vapeImage from "../assets/images/vape-image.jpeg";
import ReactStars from 'react-stars';

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

    textTruncate(str, length, ending) {
        if (length == null) {
          length = 50;
        }
        if (ending == null) {
          ending = '...';
        }
        if (str.length > length) {
          return str.substring(0, length - ending.length) + ending;
        } else {
          return str;
        }
      };

    render() {

        console.log("Multiple Results Props:",this.props);
        let juiceElements = [];
        if (this.props.all) {
            const juiceInfo = this.props.all;

            juiceElements = juiceInfo.map((item, index) => {
                const { name, manufacturer_name, manufacturer_site, manufacturer_description, id, rating } = item;
                return (
                    <div onClick={() => this.handleProductClick(id)} key={index} id= "multiple-container" className="container col-10 col-sm-10 col-md-5 bg-dark card my-2 mx-2">
                        <div id = "prod-info-main" className="prod-info-main prod-wrap">
                            <div className="card-container row">
                                <div className="rating-container col-5 d-flex align-items-center flex-column">
                                    <div className="my-auto">
                                        <div className="rating-text">Juice Rating: </div>
                                        <ReactStars className="single-results-stars stars" size={15} edit={false} count={5} value={rating} color1="grey" color2="#ffc900"/>
                                    </div>
                                </div>
                                <div className="col-7 d-flex align-items-center flex-column">
                                    <div className="my-auto">
                                        <div className="product-detail">
                                            <h5 className="name">
                                                <a href="#">
                                                    {name}
                                                </a>
                                            </h5>
                                        </div>
                                        <div className="description">
                                            <p className = "juice-description">{this.textTruncate(manufacturer_description)}</p>
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
            <div className = "multiple-results-body col-12">
                <h1 className = "multiple-results-header">Search Results</h1>
                <div className="row justify-content-center">
                    {juiceElements}
                </div>


                <Link className="mult-advanced-button btn" to="/">Home</Link>
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