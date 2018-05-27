import React, { Component } from 'react';
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import { addProduct } from "../actions";
import { Link } from "react-router-dom";
import axios from 'axios';

class AddProduct extends Component {


    handleAddProduct(values) {
        console.log("Form Values:", values);
        this.props.addProduct(values);
        this.props.history.push("/add-review");
    }


    renderInput({ label, input, meta: { touched, error } }) {
        // console.log(label, input);
        return (
            <div className="container">
                <label style={{fontSize:0.8+'em'}} className='col-xs-8'>{label}</label>
                <input {...input} type="text" autoComplete="off" className="col-xs-10 col-xs-offset-1" />
                <p className="red-text text-darken-2">{touched && error}</p>
            </div>
        )
    }

    renderTextarea({label, input, meta: {touched, error}}) {
        return (
            <div className="container">
                <label style={{fontSize:0.8+'em'}}>{label}</label>
                <textarea {...input} type="text" autoComplete="off" className="col-xs-10 col-xs-offset-1"/>
                <p className="red-text text-darken-2">{touched && error}</p>
            </div>
        )
    }




    render() {
        console.log(this.props);
        const { handleSubmit } = this.props;
        return (
            <div style={{marginTop: 5+'em'}}> 
                <h1>Add Product</h1>
                <form onSubmit={handleSubmit(this.handleAddProduct.bind(this))}>
                    <Field name="name" label="Juice Name" component={this.renderInput} />
                    <Field name="manufacturer" label="Manufacturer Name" component={this.renderInput} />
                    <Field name="site" label="Manufacturer Site" component={this.renderInput} />
                    <Field name="description" label="Manufacturer Description" component={this.renderTextarea} />
                    <button style={{fontSize:1+'em', marginTop: 1+'em'}} className="btn col-xs-6 col-xs-offset-3">Add Product</button>
                </form>
            </div>
        )
    }
}


function validate({ juice_name, manufacturer_name, manufacturer_site, manufacturer_desc }) {
    const errors = {};

    if (!juice_name) {
        errors.juice_name = "Please enter a juice name.";

    }

    if (!manufacturer_name) {
        errors.manufacturer_name = "Please enter a manufacturer name.";
    }
    if (!manufacturer_site) {
        errors.manufacturer_site = "Please enter a manufacturer website.";
    }
    if (!manufacturer_desc) {
        errors.manufacturer_desc = "Please enter a manufacturer description";
    }


    return errors;
}



AddProduct = reduxForm({
    form: "add-product",
    validate: validate
})(AddProduct);

export default connect(null, { addProduct })(AddProduct);
