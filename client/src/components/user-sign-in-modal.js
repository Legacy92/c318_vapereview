import React, {Component} from "react";

import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';



class UserSignInModal extends Component {
    constructor(props){
        super(props);
    }

    handleUserSignInModal(values) {
        console.log("Sign In Values: ", values);
    }

    renderInput({label, input, meta: {touched, error}}) {
        console.log(label, input);

        return (
            <div>
                <label>{label}</label>
                <input {...input} type= "text" autoComplete = "off"/>
                <p className = "red-text text-darken-2">{touched && error}</p>
            </div>
        )
    }

    render (){

        const {handleSubmit} = this.props;


        return (
            <div>
                <form onSubmit={handleSubmit(this.handleUserSignInModal.bind(this))}>
                    <Field name = "user_signin" label = "Log In: "placeholder = "username" component = {this.renderInput} />
                    <button>Go!</button>
                </form>
            </div>
        )
    }


}

function validate({user_signin}){
    const errors = {};

    if(!user_signin) {
        errors.landing_page = "Please enter juice query.";

    }

    return errors;
}

UserSignInModal = reduxForm({
    form: "user_signin",
    validate: validate
})(UserSignInModal);

export default UserSignInModal;