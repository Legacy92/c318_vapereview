import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { connect } from "react-redux";
import * as actions from "../actions";
import vapeImage from "../assets/images/vape-image.jpeg";
import ReactStars from 'react-stars';
import juiceBottleDefault from "../assets/images/vape-juice-bottle-questionmark.png";

class MultipleResults extends Component {

    componentDidMount() {
        const { searchTerm } = this.props.match.params;

        this.props.setSearchTerm(searchTerm);

        if(searchTerm){
            this.props.landingPageSearch(searchTerm);
        }else{
            this.props.browseAllJuices();
        }
    }

    handleProductClick(id){
        this.props.history.push(`/single-results/${id}`);

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
    }


    render() {
        let juiceElements = [];

        
        if (this.props.all.length) {
            const juiceInfo = this.props.all;

            juiceElements = juiceInfo.map((item, index) => {
                const { name, manufacturer_name, manufacturer_site, manufacturer_description, id, rating } = item;
                return (
                    <div onClick={() => this.handleProductClick(id)} key={index} id= "multiple-container" className="container col-10 col-sm-10 col-md-5 bg-dark card my-2 mx-2">
                        <div id = "prod-info-main" className="prod-info-main prod-wrap">
                            <div className="card-container row">
                                <div className="rating-container col-5 d-flex align-items-center flex-column">
                                    <div className="my-auto">
                                        <div className="multiple-results-img">
                                            <img  className="img-rounded multiple-results-image" src={juiceBottleDefault}/>
                                        </div>
                                        <div className = "multiple-results-star-container align-items-center">
                                            <ReactStars className="single-results-stars stars" size={15} edit={false} count={5} value={rating} color1="grey" color2="#ffc900"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-7 d-flex align-items-center flex-column">
                                    <div className="my-auto">
                                        <div className="product-detail">
                                            <h5 className="name">{name}</h5>                                              
                                            <h6>from: {manufacturer_name}</h6>
                                            <h6>{this.textTruncate(manufacturer_site)}</h6>
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

                <h1 className = "multiple-results-header titanicFont display-4 goldenFont">Search Results</h1>
                <div className="row justify-content-center">
                    { 
                        juiceElements.length
                            ? juiceElements
                            : <h4 className = "no-results">No Results Found.</h4>
                    }
                </div>
                <Link className="mult-advanced-button btn" to="/">Home</Link>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        all: state.juiceInfo.all,
        juiceId: state.juiceInfo.juiceId
    };

}

export default connect(mapStateToProps, actions)(MultipleResults);
