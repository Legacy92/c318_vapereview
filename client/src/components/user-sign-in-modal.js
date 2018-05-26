import React, {Component} from "react";
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { signIn, clearAuthError } from '../actions'
import { renderInput } from '../helpers';



class UserSignIn extends Component {

    componentWillUnmount(){
        this.props.clearAuthError();
    }

    handleUserSignIn(values) {
        this.props.signIn(values);
    }

    render (){

        const {handleSubmit, authError} = this.props;

        return (
            <div>
                <form onSubmit={handleSubmit(this.handleUserSignIn.bind(this))}>
                    <Field name = "user_signIn" label = "Log In: "placeholder = "username" component = {renderInput} />
                    <Field name="password" label="Password" component={renderInput} type="password"/>
                    <button className="btn">SignIn</button>
                        <p>{authError}</p>
                </form>
            </div>
        )
    }
}

function validate(values){
    const {user_signIn, password} = values;
    const errors = {};

    if(!user_signIn) {
        errors.user_signIn = 'Please enter your Username';
    }
    if(!password){
        errors.password = 'Please enter your Password';
    }

    return errors;
}

UserSignIn = reduxForm({
    form: "user_signIn",
    validate: validate
})(UserSignIn);

function mapStateToProps(state){
    return {
        authError : state.user.error
    }
}

export default connect(mapStateToProps, { UserSignIn, clearAuthError })(UserSignIn);