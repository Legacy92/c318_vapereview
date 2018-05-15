import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";


class LandingPage extends Component {
    constructor(props) {
        super(props);
    }


    handleLandingPageSearch(values) {
        console.log("Landing Page Values:", values);
    }
    renderInput({label, input, meta: {touched, error}}) {
        console.log(label, input);
        return (
            <div>
                <label>{label}</label>
                <input {...input} type="text" autoComplete="off"/>
                <p className="red-text text-darken-2">{touched && error}</p>
            </div>
        )
    }

    render(){

        const {handleSubmit} = this.props;

        return (
            <div>
                <h1>This is the Landing page!</h1>
                <form onSubmit={handleSubmit(this.handleLandingPageSearch.bind(this))}>
                    <Field name = "landing_page" label = "Search For Juice Here: "placeholder = "search" component = {this.renderInput} />

                    <button>Go!</button>
                </form>
                <br/>
               <button><Link to = "/multiple_results">Browse</Link></button>
               <button><Link to = "/add-product">Add Juice</Link></button>
               <button><Link to = "/single-results">Random</Link></button>

            </div>
        )
    }
}


function validate({landing_page}){
    const errors = {};

    if(!landing_page) {
        errors.landing_page = "Please enter juice query.";
    }

    return errors;
}

LandingPage = reduxForm({
    form: "landing_page",
    validate: validate
})(LandingPage);


export default LandingPage;
// export default connect(null, {addProduct})(AddProduct);
