import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import * as actions from "../actions";



class LandingPage extends Component {
    constructor(props) {
        super(props);
    }


    async handleLandingPageSearch(values) {
        console.log("Landing Page Values:", values);
        await this.props.landingPageSearch(values);
        this.props.history.push(`/multiple-results/${values.input}`);


    }

    getJuicesToBrowse(){
        console.log('browse button clicked');
        this.props.browseAllJuices();
    }

    async getRandomJuice(values){
        console.log('random juice requested');
        await this.props.getRandomJuice();
    }
    renderInput({label, input, meta: {touched, error}}) {
        return (
            <div>
                <label>{label}</label>
                <input className="input-field" {...input} type="text" autoComplete="off"/>
                <p className="red-text text-darken-2">{touched && error}</p>
            </div>
        )
    }

    render(){
            console.log("State Props:", this.props.all, this.props.juice);
            const {handleSubmit} = this.props;

        return (
            <div className="landing-page-body">
                <h1>This is the Landing page!</h1>
                <form onSubmit={handleSubmit(this.handleLandingPageSearch.bind(this))}>
                    <Field name = "input" label = "Search For Juice Here: " placeholder = "search" component = {this.renderInput} />

                    <button  className="btn white-text">Go!</button>
                </form>
                
               <Link className="btn red white-text" to = "/multiple-results-browse">Browse</Link>
               <Link className="btn red white-text" to = "/add-product">Add Juice</Link>
               <Link className="btn red white-text" to = "/single-results/:juiceId">Random</Link>

            </div>
        )
    }
}
LandingPage = reduxForm({
    form: "input",
    validate: validate
})(LandingPage);


function validate({input}){
    const errors = {};

    if(!input) {
        errors.input = "Please enter juice query.";
    }

    return errors;
 }
// function mapStateToProps(state) {
//     return {
//         all: state.juiceInfo.all,
//         juice: state.juiceInfo.juice
//     };
//
// }

export default connect(null, actions)(LandingPage);
