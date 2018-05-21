import React, { Component } from 'react';
import { Link } from 'react';
import { connect } from "react-redux";
import {Field, reduxForm} from 'redux-form';
import axios from 'axios';
import { addReview } from "../actions";
import Nav from './nav';

class AddReview extends Component {

    handleAddReview(values) {
        console.log("Add Review Values:", values);
         this.props.addReview(values);
         this.props.history.push("/single-results");
    }

    renderInput({label, input, meta: {touched, error}}) {
        // console.log(label, input);
        return (
            <div>
                <label>{label}</label>
                <input {...input} type="text"placeholder="input" autoComplete="off"/>
                <p className="red-text text-darken-2">{touched && error}</p>
            </div>
        )
    }

    renderTextarea({label, input, meta: {touched, error}}) {
        // console.log(label, input);
        return (
            <div>
                <label>{label}</label>
                <textarea {...input} type="text" placeholder="Speak your mind" autoComplete="off"/>
                <p className="red-text text-darken-2">{touched && error}</p>
            </div>
        )
    }

    render() {
        console.log(this.props);
        const {handleSubmit} = this.props;
        return (
        <div className="add-review">
            <h1>Add Review for currentJuiceName</h1>

            <form onSubmit={handleSubmit(this.handleAddReview.bind(this))}>
                    <Field name="juice_id" label="juice_id" component={this.renderInput}/>
                    <Field name="user_id" label="user_id" component={this.renderInput}/>
                    <Field name="flavor" label="flavor tasted" component={this.renderInput}/>
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
AddReview = reduxForm({
    form: "add_review"
})(AddReview);

export default connect(null, {addReview})(AddReview);