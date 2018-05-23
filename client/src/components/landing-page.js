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
        // await this.props.pullJuiceData();
        // await this.props.searchByFlavorName();
        await this.props.landingPageSearch(values);
        this.props.history.push("/multiple-results");

    }

    getJuicesToBrowse(){
        console.log('browse button clicked');
        this.props.browseAllJuices();
        this.props.history.push("/multiple-results");
    }
    renderInput({label, input, meta: {touched, error}}) {
        // console.log(label, input);
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
            <div>
                <h1>This is the Landing page!</h1>
                <form onSubmit={handleSubmit(this.handleLandingPageSearch.bind(this))}>
                    <Field name = "input" label = "Search For Juice Here: "placeholder = "search" component = {this.renderInput} />

                    <button  className="btn white-text">Go!</button>
                </form>
                <br/>
               <Link className="btn white-text" to = "/multiple_results" onClick={this.getJuicesToBrowse.bind(this)}>Browse</Link>
               <Link className="btn white-text" to = "/add-product">Add Juice</Link>
               <Link className="btn white-text" to = "/single-results">Random</Link>

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
function mapStateToProps(state) {
    return {
        all: state.juiceInfo.all,
        juice: state.juiceInfo.juice
    };

}

export default connect(mapStateToProps, actions)(LandingPage);
