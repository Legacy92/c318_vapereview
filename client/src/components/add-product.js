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
            <div>
                <div className="input-group justify-content-center pt-5">
                <input className="align-middle input-field col-8" style={{marginTop: 1+'em', fontSize: 15+'px'}} placeholder={label} {...input} type="text" autoComplete="off"/>
                </div>
                <p className="text-danger">{touched && error}</p>
            </div>
        )
    }

    renderTextarea({label, input, meta: {touched, error}}) {
        return (
            <div>
                <div className="input-group justify-content-center pt-5">
                <textarea className="align-middle input-field col-8" style={{marginTop: 1+'em', fontSize: 15+'px'}}  {...input} type="text" autoComplete="off"  placeholder={label}/>
                </div>
                <p className="text-danger">{touched && error}</p>
            </div>
        )
    }




    render() {
        const { handleSubmit } = this.props;
        return (
            <div style={{marginTop: 1+'em'}}> 
                <div className="pt-5 titanicFont display-4 addProduct goldenFont d-md-block">Add Product</div>
                <form onSubmit={handleSubmit(this.handleAddProduct.bind(this))}>
                    <Field className="align-middle" name="juice_name" label="Juice Name" component={this.renderInput} />
                    <Field className="align-middle" name="manufacturer_name" label="Manufacturer Name" component={this.renderInput} />
                    <Field className="align-middle" name="manufacturer_site" label="Manufacturer Site" component={this.renderInput} />
                    <Field className="align-middle" name="manufacturer_description" label="Manufacturer Description" component={this.renderTextarea} />
                    <button style={{fontSize:1+'em', marginTop: 1+'em'}} className="btn col-xs-6 col-xs-offset-3">Add Product</button>
                </form>
            </div>
        )
    }
}


function validate({ juice_name, manufacturer_name, manufacturer_site, manufacturer_description }) {
    const errors = {};

    if (!juice_name) {
        errors.juice_name = "Please enter a Juice Name";
    }

    if (!manufacturer_name) {
        errors.manufacturer_name = "Please enter a Manufacturer Name";
    }
    if (!manufacturer_site) {
        errors.manufacturer_site = "Please enter a Manufacturer website";
    }
    if (!manufacturer_description) {
        errors.manufacturer_description = "Please enter a Manufacturer Description";
    }


    return errors;
}



AddProduct = reduxForm({
    form: "add-product",
    validate: validate
})(AddProduct);

export default connect(null, { addProduct })(AddProduct);
