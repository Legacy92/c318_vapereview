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
        this.props.history.go(-1);
    }

    render (){

        const {handleSubmit, authError} = this.props;

        return (

            <div>
                <h1 className = "titanicFont display-4  goldenFont">Sign In</h1>
                <div className = "col-10 offset-1">
                    <div className ="sign-in-body">
                        <div className="modal-body">
                            <form style={{textAlign: 'center'}} onSubmit={handleSubmit(this.handleUserSignIn.bind(this))}>
                                <label>Email:</label>
                                <Field name="email" type = "email" component={renderInput}/>
                                <label>Password:</label>
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
            </div>
        )
    }
}


function validate(values){
    const {email, password} = values;
    const errors = {};

    if(!email) {
        errors.email = 'Please enter your Email.';

    }
    if(!password){
        errors.password = 'Please enter your Password.';
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

export default connect(mapStateToProps, { signIn, clearAuthError })(UserSignIn);