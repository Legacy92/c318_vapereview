import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { connect } from 'react-redux';
import { getCategories, getFlavors } from '../../actions';
import './flavor-modal.css';
import Dropdown from './dropdown';

class FlavorModal extends Component {


    componentDidMount(){
        this.props.getCategories();
    }

    getFlavor(id){
        console.log('Category ID:', id);

        this.props.getFlavors(id);
    }

    render() {

        console.log('Flavor Modal Props:', this.props);

        const { categories } = this.props;

        const categoryItems = ['Action', 'Another Action', 'Something Else Here'];

        return (
            <div className = "flavor-body">
                <h2 className = "flavor-header">Select Flavors Tasted</h2>
                <div className="flavor-modal-dropdowns">
                    {
                        categories.length
                            ? <Dropdown action={this.getFlavor.bind(this)} btnText="Category:" menuItems={categories} />
                            : null
                    }

                    

                    {/* // <Dropdown btnText="Flavor 1:" menuItems={categoryItems} />

                    // <Dropdown btnText="Flavor 2:" menuItems={categoryItems} />

                    // <Dropdown btnText="Flavor 3:" menuItems={categoryItems} /> */}
                </div>
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>

            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        categories: state.juiceInfo.categories
    };
}

export default connect(mapStateToProps, { getCategories, getFlavors })(FlavorModal);
