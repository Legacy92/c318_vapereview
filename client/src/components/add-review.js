import React, { Component } from 'react';
import { Link } from 'react';
import { connect } from "react-redux";
import { Field, reduxForm } from 'redux-form';
import axios from 'axios';
import { addReview, singleItem, clearReviewFlavors } from "../actions";
import Nav from './nav';
import FlavorModal from './flavor-modal';
import { renderInput, renderTextarea } from "../helpers";
import ReactStars from "react-stars";

class AddReview extends Component {
    constructor(props){
        super(props);

        this.state = {
            rating: 0
        }
    }

    async componentDidMount(){
        const {juice_id} = this.props.match.params;
        await this.props.singleItem(juice_id);
    }

    componentWillUnmount(){
        this.props.clearReviewFlavors();
    }

    async handleAddReview(values) {
        const {juice_id} = this.props.match.params;
        const {reviewFlavors: flavors} = this.props;
        const { rating } = this.state;

        const review = {...values, juice_id, flavors, rating};

        try {
            await this.props.addReview(review);
            this.props.history.push(`/single-results/${juice_id}`);
        } catch(err){
            // Review didn't save, do something
        }
    }

    renderInput({label, input, meta: {touched, error}}) {
        return (
            <div>
                <label>{label}</label>
                <input {...input} type="text"placeholder="input" autoComplete="off"/>
                <p className="text-danger">{touched && error}</p>
            </div>
        )
    }

    renderTextarea({label, input, meta: {touched, error}}) {
        return (
            <div>
                <div className="input-group justify-content-center pt-5">
                <label>{label}</label>
                <textarea {...input} type="text"placeholder="input" autoComplete="off"></textarea>
                </div>
                <p className="text-danger">{touched && error}</p>
            </div>
        )
    }

    render() {
        const {handleSubmit} = this.props;
        const { rating } = this.state;
        
        if(this.props.singleItemInfo){
            const {name} = this.props.singleItemInfo;
            return (
                <div>
                    <h1 className="addReview titanicFont display-4 goldenFont">Add Review</h1>
                    <div className="add-review-body card col-10 offset-1">
                        <h1 className="juiceName">{name}</h1>
                        <form onSubmit={handleSubmit(this.handleAddReview.bind(this))}>
                            <FlavorModal/>
                            <label className="col-12">{`How many stars would you give ${name}? (1-5)`}</label>
                            <div className=" col-12 my-4 add-review-stars-container">
                                <ReactStars value={rating} className="add-review-stars  stars" onChange={rating => this.setState({rating})} size={40}  count={5}  color1="grey" color2="#ffc900"/>
                            </div>
                            <label>{`What did you think of ${name}`}</label>
                            <Field name="description" component={renderTextarea}/>
                            <button className="btn">Add Review</button>
                        </form>
                    </div>
                </div>
            )
        }else{
            return <h1>Loading</h1>
        }
    }
}


function mapStateToProps(state) {
    return {
        all: state.juiceInfo.all,
        juiceId: state.juiceInfo.juiceId,
        flavorList: state.juiceInfo.flavorList,
        reviewFlavors: state.juiceInfo.reviewFlavors,
        singleItemInfo:state.juiceInfo.singleItemInfo
    };

}
AddReview = reduxForm({
    form: "add-review"
})(AddReview);

export default connect(mapStateToProps, {addReview, singleItem, clearReviewFlavors})(AddReview);