import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import {} from '../actions';

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
            <div className = "flavor-body">
                <h2 className = "flavor-header">Select Flavors Tasted</h2>
                <div className="flavor-modal-dropdowns">
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Category: 
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a className="dropdown-item" href="#">Action</a>
                            <a className="dropdown-item" href="#">Another action</a>
                            <a className="dropdown-item" href="#">Something else here</a>
                    </div>
                    </div>
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Flavor 1: 
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a className="dropdown-item" href="#">Action</a>
                            <a className="dropdown-item" href="#">Another action</a>
                            <a className="dropdown-item" href="#">Something else here</a>
                    </div>
                    </div>
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Flavor 2: 
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a className="dropdown-item" href="#">Action</a>
                            <a className="dropdown-item" href="#">Another action</a>
                            <a className="dropdown-item" href="#">Something else here</a>
                    </div>
                    </div>
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Flavor 3: 
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a className="dropdown-item" href="#">Action</a>
                            <a className="dropdown-item" href="#">Another action</a>
                            <a className="dropdown-item" href="#">Something else here</a>
                    </div>
                    </div>
                </div>
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>

            </div>
        )
    }
}

export default FlavorModal;
