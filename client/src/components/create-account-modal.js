import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { signUp, clearAuthError } from '../actions';
import { renderInput } from '../helpers';
import axios from 'axios';

class CreateAccount extends Component {

    handleSignUp(values) {
        this.props.signUp(values);
    }

    componentWillUnmount(){
        this.props.clearAuthError();
    }

    render() {
        const {handleSubmit, authError} = this.props;
        return (
            <div>

            <h1 className = "create-header">invisiheader</h1>
            <div className="col-8 offset-2 create-account-body">
                <div className="create-account-modal-body">
                    <h1 className = "create-account-title">Create an Account</h1>
                        <form style={{textAlign: 'center'}} onSubmit={handleSubmit(this.handleSignUp.bind(this))}>
                            <label>Email*</label>
                            <Field name = "email" className="no-margin" component= {renderInput}/>
                            <label>Username*</label>
                            <Field name="username" component={renderInput}/>
                            <label>Password*</label>
                            <Field name="password" type = "password" component={renderInput}/>
                            <label>Confirm Password*</label>
                            <Field name="confirm_password" type = "password" component={renderInput}/>
                            <button>Create an Account</button>
                            <p>{authError}</p>
                      </form>
                </div>
                <div className="modal-footer">
                    <p style={{margin: 'auto'}}>Been here before? <Link to="/user-sign-in" style={{color: '#3f0080'}}>Sign in.</Link></p>
                </div>
            </div>
            </div>
        );
    }
}

function validate(values){
    const {username, password, confirm_password, email} = values;
    const errors = {};

    if(!username) {
        errors.username = "Please enter your username.";

    }
    if(!email) {
        errors.email = "Please enter your email.";

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

export default connect(mapStateToProps, {signUp, clearAuthError})(CreateAccount); 