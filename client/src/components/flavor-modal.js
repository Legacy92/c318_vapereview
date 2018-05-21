import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

class FlavorModal extends Component {


    componentDidMount(){
        // flavors needs the category ID
        // this.flavors();
        this.categorys();
    }

    // send id
    async flavors(){
        const response = await axios.get("/api/flavor-modal");
        console.log("flavors:", response);
    }

    // this is fine
    async categorys(){
        const response = await axios.get("/api/category-modal");
        console.log("categorys:", response);
    }


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
