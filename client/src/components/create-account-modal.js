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
                    <h1>Create an Account <span data-dismiss="modal" >X</span></h1>
                        <form style={{textAlign: 'left'}} onSubmit={handleSubmit(this.handleSignUp.bind(this))}>
                        <label>Username*</label>
                          <Field name="username" component={renderInput}/>
                          <label>Password*</label>
                          <Field name="password" component={renderInput}/>
                          <label>Confirm Password*</label>
                          <Field name="confirm_password" component={renderInput}/>
                            <button>Create an Account</button>
                            <p>{authError}</p>
                      </form>
                    </div>
                    <div className="modal-footer">
                    <p style={{margin: 'auto'}}>Been here before? <Link to="/user-sign-in" style={{color: '#3f0080'}}>Sign in.</Link></p>
                    </div>
                    <div>
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