import React, { Component } from 'react';
import { Link } from 'react';
import { connect } from "react-redux";
import {Field, reduxForm} from 'redux-form';
import axios from 'axios';
import { addReview, singleItem } from "../actions";
import Nav from './nav';
import FlavorModal from './flavor-modal';

class AddReview extends Component {

    async componentDidMount(){
        const {juice_id} = this.props.match.params;
        await this.props.singleItem(juice_id);
    }
    handleAddReview(values) {
        const {juice_id} = this.props.match.params;
        const {reviewFlavors} = this.props;
        const newValues = {...values, juice_id, reviewFlavors};

        console.log("Add Review Values:", newValues);
         this.props.addReview(newValues);
        this.props.history.push(`/single-results/${juice_id}`);

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
        if(this.props.singleItemInfo[0]){
            const {name} = this.props.singleItemInfo[0];
            return (
            <div className="add-review">
                <h1 className="addReview">Add Review for <span className="juiceName">{name}</span> </h1>

                <form onSubmit={handleSubmit(this.handleAddReview.bind(this))}>
                        <Field name="user_id" label="user_id" component={this.renderInput}/>
                        <FlavorModal/>
                        <Field name="rating" label={`How many stars would you give ${name}? (1-5)`} component={this.renderInput}/>
                        <Field name="description" label={`What did you think of ${name}`} component={this.renderTextarea}/>
                        <button className="btn">Add Review</button>
                </form>
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

export default connect(mapStateToProps, {addReview, singleItem})(AddReview);