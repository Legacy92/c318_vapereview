import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { createAccount } from '../actions';
import axios from 'axios';


class CreateAccount extends Component {

    handleCreateAccountSubmission(values) {
        console.log("Form Values:", values);
        this.props.createAccount(values);




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



    render() {
        const {handleSubmit} = this.props;
        return (
            <div className="create-account">
                <div className ="modal-content">
                    
                    <div className="modal-body">
                        <form onSubmit={handleSubmit(this.handleCreateAccountSubmission.bind(this))}>
                          <Field name="username" label="Enter Username" component={this.renderInput}/>
                          <Field name="password" label="Enter Password" component={this.renderInput}/>
                          <Field name="confirm_password" label="Confirm Password" component={this.renderInput}/>
                            <button>Create Account</button>
                      </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                    <div>
                        <p>Been here before? <Link to = "/user-sign-in-modal">Sign in.</Link></p>
                    </div>
                </div>
                
            </div>
        );
    }
}


function validate({username, password, confirm_password}){
    const errors = {};

    if(!username) {
        errors.username = "Please enter your username.";

    }
    if(!password) {
        errors.password = "Please enter your password.";

    }
    if(!confirm_password) {
        errors.confirm_password = "Please confirm your password.";

    }

    if(confirm_password!==password) {
        errors.confirm_password = "Entries do not match.";
    }



    return errors;
}

CreateAccount = reduxForm({
    form: "create-account-page",
    validate: validate
})(CreateAccount);



export default connect(null, {createAccount})(CreateAccount); 