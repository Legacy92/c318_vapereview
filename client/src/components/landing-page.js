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
            <div>
                <div className="input-group justify-content-center pt-5">
                    <input className=" align-middle input-field col-8" {...input} type="text" autoComplete="off" placeholder="Find your vape juice..."/>
                    <div className="input-group-prepend">
                        <button className="btn btn-default btn-sm">
                        <i className="large material-icons">search</i>
                        </button>
                    </div>
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
            <div className="pt-5 display-2 titanicFont goldenFont d-none d-md-block">Juice Query</div>
                <form className="mb-5" onSubmit={handleSubmit(this.handleLandingPageSearch.bind(this))}>
                    <Field className="align-middle" name="input" component={this.renderInput} />
                </form>
                <Link style={{margin:1.0+'%'}} className="btn btn-lg white-text" to="/multiple-results-browse">Browse</Link>
                <Link style={{margin:1.0+'%'}} className="btn btn-lg white-text" to="/add-product">Add Juice</Link>
                <Link style={{margin:1.0+'%'}} className="btn btn-lg white-text" to="/single-results/random">Random</Link>

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