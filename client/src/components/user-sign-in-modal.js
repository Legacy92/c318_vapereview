import React, {Component} from "react";
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { signIn, clearAuthError } from '../actions'
import { renderInput } from '../helpers';
import '../assets/css/app.css';



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
            <h1 className = "create-header">invisiheader</h1>
            <div className ="sign-in-body">
                <div className="modal-body">
                    <h1>Sign In</h1>
                    <form style={{textAlign: 'center'}} onSubmit={handleSubmit(this.handleUserSignIn.bind(this))}>
                        <label>Email*</label>
                        <Field name="user_signIn" type = "email" component={renderInput}/>
                        <label>Password*</label>
                        <Field name="password" type = "password" component={renderInput}/>
                        <button>Sign In</button>
                        <p>{authError}</p>
                    </form>
                </div>
                <div className="modal-footer">
                    <p style={{margin: 'auto'}}>New Around Here? <Link to="/create-account-modal" style={{color: '#3f0080'}}>Create account here.</Link></p>
                </div>
            </div>
            </div>
        )
    }
}


function validate(values){
    const {user_signIn, password} = values;
    const errors = {};

    if(!user_signIn) {
        errors.user_signIn = 'Please enter your Email';
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