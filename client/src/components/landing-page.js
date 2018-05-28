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
                <input className="input-field col-xs-4 col-xs-offset-4" {...input} type="text" autoComplete="off" />
                <div className='input-group-prepend'>
                    <button className="btn btn-default btn-lg">
                        <span className="glyphicon glyphicon-search"></span> 
                    </button>
                <p className="text-danger">{touched && error}</p>
                </div>
            </div>

        )
    }

    render() {
        console.log("State Props:", this.props.all, this.props.juice);
        const { handleSubmit } = this.props;

        return (
            <div className="landing-page-body">
            <div className=" display-1 titanicFont goldenFont d-none d-md-block">Juice Query</div>
                <form onSubmit={handleSubmit(this.handleLandingPageSearch.bind(this))}>
                    <Field className="align-middle" name="input" component={this.renderInput} />
                </form>
                <br />
                <Link className="btn white-text" to="/multiple-results-browse">Browse</Link>
                <Link className="btn white-text" to="/add-product">Add Juice</Link>
                <Link className="btn white-text" to="/single-results/:juiceId">Random</Link>

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
        errors.input = "Please type a search value.";
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
