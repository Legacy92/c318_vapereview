import React, { Component } from 'react';
import { Link } from 'react';

class CreateAccount extends Component {
    render() {
        return (
            <div className="create-account">
                <div className ="modal-content">
                    
                    <div className="modal-body">
                        <div className="user-name">
                            <input type="text" name = "User Name" value = ""/>
                        </div>
                        <div className="password">
                            <input type="text" name = "Password" value = ""/>

                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                    <div>
                        <button type = "button" className = "btn btn-success">Submit</button>
                    </div>
                </div>
                
            </div>
        );
    }
}

export default CreateAccount; 