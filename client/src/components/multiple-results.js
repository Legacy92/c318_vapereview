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

        console.log("Multiple Results Props:",this.props);
        let juiceElements = [];
        if (this.props.all) {
            const juiceInfo = this.props.all;

            juiceElements = juiceInfo.map((item, index) => {
                const { name, manufacturer_name, manufacturer_site, manufacturer_description, id, rating } = item;
                return (

                    <div onClick={() => this.handleProductClick(id)} key={index} id= "multiple-container" className="contianer col-12 col-sm-5 bg-dark card my-3 mx-2">
                        <div id = "prod-info-main"className="prod-info-main prod-wrap">

                                <div className="card-container row">
                                    <div className="rating-container col-xs-4 d-flex align-items-center flex-column">
                                        <div className="my-auto">                                    
                                            <div className="rating-number">star rating</div>
                                            <div className="rating">Rating:{rating}</div>
                                        </div>
                                    </div>
                                    <div className="col-xs-8 d-flex align-items-center flex-column">
                                        <div className="my-auto">
                                            <div className="product-detail">
                                                <h5 className="name">
                                                    <a href="#">
                                                        {name}
                                                    </a>
                                                </h5>
                                            </div>
                                            <div className="description">
                                                <p className = "juice-description">{manufacturer_description}</p>
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