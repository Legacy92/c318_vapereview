import React, { Component } from 'react';
import { Link } from 'react';
import { connect } from "react-redux";
import {Field, reduxForm} from 'redux-form';
import axios from 'axios';
import { addReview } from "../actions";
import Nav from './nav';
import FlavorModal from './flavor-modal';

class AddReview extends Component {

    handleAddReview(values) {
        const {juice_id} = this.props.match.params;
        const {reviewFlavors} = this.props;
        const newValues = {...values, juice_id, reviewFlavors};

        console.log("Add Review Values:", newValues);
         this.props.addReview(newValues);
        this.props.history.push(`/single-results/${juice_id}`);

    }

    renderInput({label, input, meta: {touched, error}}) {
        // console.log(label, input);
        return (
            <div>
                <label>{label}</label>
                <input {...input} type="text"placeholder="input" autoComplete="off"/>
                <p className="text-danger">{touched && error}</p>
            </div>
        )
    }

    renderTextarea({label, input, meta: {touched, error}}) {
        // console.log(label, input);
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

    moveToAddFlavors(){
        const {juice_id} = this.props.match.params;
        this.props.history.push(`/flavor-modal/${juice_id}`);
    }

    render() {
        console.log(this.props.reviewFlavors, this.props.singleItemInfo);
        console.log("Add Review Props:", this.props);
        const {handleSubmit} = this.props;
        return (
        <div className="add-review">
            <h1>Add Review for currentJuiceName</h1>

            <form onSubmit={handleSubmit(this.handleAddReview.bind(this))}>
                    <Field name="user_id" label="user_id" component={this.renderInput}/>
                    <FlavorModal/>
                    <Field name="rating" label="How many stars would you give currentJuiceName? (1-5)" component={this.renderInput}/>
                    <Field name="description" label="What did you think of currentJuiceName?" component={this.renderTextarea}/>
                    <button className="btn">Add Review</button>
            </form>


            {/* <div className="star-rating">
                <h2>Rating:</h2>
            </div>
            <div className = "add-review">
                <h2></h2>
                <textarea rows="4" cols="50"/>
            </div>
            <button type = "button" className = "btn btn-success">Submit</button> */}
        </div>
        )
    }
}

// export default AddReview;

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

export default connect(mapStateToProps, {addReview})(AddReview);