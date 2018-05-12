import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CreateAccount extends Component {
    render() {
        return (
            <div className="create-account">
                <div className ="modal-content">
                    
                    <div className="modal-body">
                        <div className="user-name">
                            <input type="text" name = "User Name" value = "" placeholder = "username"/>
                        </div>
                        <div className="password">
                            <input type="text" name = "Password" value = "" placeholder = "password"/>
                        </div>
                        <div className="verify-password">
                            <input type="text" name = "Password" value = "" placeholder = "verify password"/>
                        </div>
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

export default CreateAccount; 