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
        this.props.history.push("/multiple_results");

    }
    renderInput({label, input, meta: {touched, error}}) {
        console.log(label, input);
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
                    <Field name = "landing_page" label = "Search For Juice Here: "placeholder = "search" component = {this.renderInput} />

                    <button  className="btn white-text">Go!</button>
                </form>
                <br/>
               <Link className="btn white-text" to = "/multiple_results">Browse</Link>
               <Link className="btn white-text" to = "/add-product">Add Juice</Link>
               <Link className="btn white-text" to = "/single-results">Random</Link>

            </div>
        )
    }
}
LandingPage = reduxForm({
    form: "landing_page",
    validate: validate
})(LandingPage);


function validate({landing_page}){
    const errors = {};

    if(!landing_page) {
        errors.landing_page = "Please enter juice query.";
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
