import React, { Component } from 'react';
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import {Route} from "react-router-dom";
import { addProduct } from "../actions";
import {Link} from "react-router-dom";
import Test from './test';
import axios from 'axios';

class AddProduct extends Component {


    handleAddProduct(values) {
        console.log("Form Values:", values);
         this.props.addProduct(values);

        // await this.props.addToDoItem(values);

        // this.props.history.push("/");

        // console.log("Add Item Props:", this.props);
    }


    renderInput({label, input, meta: {touched, error}}) {
        // console.log(label, input);
        return (
            <div>
                <label>{label}</label>
                <input {...input} type="text" autoComplete="off"/>
                <p className="red-text text-darken-2">{touched && error}</p>
            </div>
        )
    }





    render() {
        const {handleSubmit} = this.props;
        return (
            <div>
                <h1>Add Product</h1>
                <form onSubmit={handleSubmit(this.handleAddProduct.bind(this))}>
                    <Field name="name" label="Juice Name" component={this.renderInput}/>
                    <Field name="manufacturer" label="Manufacturer Name" component={this.renderInput}/>
                    <Field name="description" label="Manufacturer Description" component={this.renderInput}/>
                    <Field name="site" label="Manufacturer Site" component={this.renderInput}/>
                    <button className="btn">Add Product</button>
                </form>
                <Link to="/add-review">Add Review</Link>
                <Route path= "/test" component={Test}/>
            </div>
        )
    }
}


function validate({juice_name, manufacturer_name, manufacturer_site, manufacturer_desc}){
    const errors = {};

    if(!juice_name) {
        errors.juice_name = "Please enter a juice name.";

    }

    if(!manufacturer_name) {
        errors.manufacturer_name = "Please enter a manufacturer name.";
    }
    if(!manufacturer_site) {
        errors.manufacturer_site = "Please enter a manufacturer website.";
    }
    if(!manufacturer_desc) {
        errors.manufacturer_desc = "Please enter a manufacturer description";
    }


    return errors;
}



AddProduct = reduxForm({
    form: "add_product",
    validate: validate
})(AddProduct);

export default connect(null, {addProduct})(AddProduct);
