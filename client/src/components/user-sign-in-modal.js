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
        <div style={{marginTop:20+'%'}}>
            <div className ="modal-content">
            <button type="button" className="close mr-0 float-right" aria-label="Close"data-dismiss="modal"><span aria-hidden="true">X</span></button>
                <div className="modal-body">
                <h1>Sign In</h1>
                    <form style={{textAlign: 'left'}} onSubmit={handleSubmit(this.handleUserSignIn.bind(this))}>
                    <label>Username*</label>
                    <Field name="user_signIn" component={renderInput}/>
                    <label>Password*</label>
                    <Field name="password" component={renderInput}/>
                        <button>Sign In</button>
                        <p>{authError}</p>
                </form>
                </div>
                <div className="modal-footer">
                <p>New Around Here?<Link to="/create-account" style={{color: '#3f0080', display:'block'}}>Create an Account</Link></p>
                </div>
                <div>
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