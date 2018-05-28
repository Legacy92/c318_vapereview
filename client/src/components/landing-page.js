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

    getJuicesToBrowse() {
        console.log('browse button clicked');
        this.props.browseAllJuices();
    }

    async getRandomJuice(values) {
        console.log('random juice requested');
        await this.props.getRandomJuice();
    }
    renderInput({ label, input, meta: { touched, error } }) {
        return (
            <div className='search input-group'>
                <input className="input-field col-xs-7 col-xs-offset-2" {...input} type="text" autoComplete="off" />
                <div className='input-group-prepend'>
                    <button className="btn btn-default btn-lg">
                        <span className="glyphicon glyphicon-search"></span> 
                    </button>
                </div>
                <p className="text-danger">{touched && error}</p>
            </div>

        )
    }

   
    render() {
        console.log("State Props:", this.props.all, this.props.juice);
        const { handleSubmit } = this.props;

        return (
            <div className="landing-page-body">
                <form onSubmit={handleSubmit(this.handleLandingPageSearch.bind(this))}>
                    <Field name="input" component={this.renderInput} />
                </form>
                <br />
                <Link style={{margin:0.5+'%'}} className="btn btn-lg white-text" to="/multiple-results-browse">Browse</Link>
                <Link style={{margin:0.5+'%'}} className="btn btn-lg white-text" to="/add-product">Add Juice</Link>
                <Link style={{margin:0.5+'%'}} className="btn btn-lg white-text" to="/single-results/:juiceId">Random</Link>

            </div>
        )
    }
}
LandingPage = reduxForm({
    form: "input",
    validate: validate
})(LandingPage);


function validate({ input }) {
    const errors = {};

    if (!input) {
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
