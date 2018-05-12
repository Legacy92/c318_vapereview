import React, { Component } from 'react';
import {Link} from "react-router-dom";

class AddProduct extends Component {
    render() {
        return (
            <div>
                <h1>Add Product</h1>
                <Link to="/add-review">Add Review</Link>
            </div>
        )
    }
}

export default AddProduct;