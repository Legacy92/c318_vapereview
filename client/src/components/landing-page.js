import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";


class LandingPage extends Component {
    constructor(props) {
        super(props);
    }
    renderInput({ label, input, meta: { touched, error } }) {
        console.log(label, input);
        return (
            <div>
                <label>{label}</label>
                <input {...input} type="text" autoComplete="off" />
                <p className="red-text text-darken-2">{touched && error}</p>
            </div>
        )
    }
    handleSearchInput(values) {
        console.log("Search Values:", values);


        // await this.props.addToDoItem(values);

        // this.props.history.push("/");

        console.log("Juice Search Props:", this.props);
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <div>
                <h1>This is the Landing page!</h1>
                <form onSubmit={handleSubmit(this.handleSearchInput.bind(this))}>
                    <Field type="text" placeholder="search" name="search_field" label="Search For Juice" component={this.renderInput} />
                    <button>Go!</button>
                    <br />
                    <button><Link to="/multiple_results">Browse</Link></button>
                    <button><Link to="/add-product">Add Juice</Link></button>
                    <button><Link to="/single-results">Random</Link></button>
                </form>
            </div>
        )
    }
}
function validate({search_field}){
    const errors = {};

    if(!search_field) {
        errors.juice_name = "Please enter juice query";

    }


    return errors;
}
LandingPage = reduxForm({
    form: "landing_page",
    validate: validate
})(LandingPage);

export default LandingPage;
// export default connect(null, {addProduct})(AddProduct);
