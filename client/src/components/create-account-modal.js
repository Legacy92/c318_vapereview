import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { signUp, clearAuthError } from '../actions';
import { renderInput } from '../helpers';
import axios from 'axios';

class CreateAccount extends Component {

    handleSignUp(values) {
        console.log("Form Values:", values);
        this.props.signUp(values);
    }

    componentWillUnmount(){
        this.props.clearAuthError();
    }

    render() {
        const {handleSubmit, authError} = this.props;
        return (
            <div className="create-account">
                <div className ="modal-content">
                    <div className="modal-body">
                        <form onSubmit={handleSubmit(this.handleSignUp.bind(this))}>
                          <Field name="username" label="Enter Username" component={renderInput}/>
                          <Field name="password" label="Enter Password" component={renderInput}/>
                          <Field name="confirm_password" label="Confirm Password" component={renderInput}/>
                            <button>Create Account</button>
                            <p>{authError}</p>
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

function validate(values){
    const {username, password, confirm_password} = values;
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

function mapStateToProps(state){
    return {
        authError: state.user.error
    }
}

export default connect(mapStateToProps, {CreateAccount, clearAuthError})(CreateAccount); 