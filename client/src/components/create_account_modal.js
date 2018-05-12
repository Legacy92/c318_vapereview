import React, { Component } from 'react';

class CreateAccount extends Component {
    render() {
        return (
            <div className="create-account">
                <button type = "button" className = "btn btn-success">Submit</button>
                <div className ="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                        <h4 className="modal-title">Test Modal</h4>
                    </div>
                    <div className="modal-body">
                        <p>Div. youre a div.</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                </div>
                
            </div>
        );
    }
}

export default CreateAccount; 