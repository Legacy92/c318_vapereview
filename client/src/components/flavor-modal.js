import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class FlavorModal extends Component {
    render() {
        return (
            <div>
                <h1>Test Flavor Modal</h1>
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
            </div>
        )
    }
}

export default FlavorModal;
