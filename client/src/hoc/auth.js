import React, { Component } from 'react';
import { connect } from 'react-redux';
import {username} from '../actions';


export default function(WrappedComponent){
    class Auth extends Component {

        componentDidMount(){
            console.log("this is from auth");
            if(!this.props.auth){
                this.props.history.push('/');
            }
        }

        componentWillReceiveProps(nextProps){
            if(!nextProps.auth){
                this.props.history.push('/');
            }
        }

        render(){
            return <WrappedComponent {...this.props}/>
        }
    }

    function mapStateToProps(state){
        return {
            auth: state.user.auth,
            user: state.user.user
        }
    }

    return connect(mapStateToProps)(Auth);
}