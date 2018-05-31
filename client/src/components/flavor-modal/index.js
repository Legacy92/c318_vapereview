import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { connect } from 'react-redux';
import { getCategories, setCategory, setFlavor, addSelectedFlavor } from '../../actions';
import './flavor-modal.css';
import Dropdown from './dropdown';
import FlavorList from './flavor_list';
import purpArrow from "../../assets/images/trans-purple-arrow.png";

class FlavorModal extends Component {


    componentDidMount(){
        this.props.getCategories();
        console.log(this.props);
    }

    handleSetCategory(id, name){
        console.log('Set Cat:', id, name);
        this.props.setCategory(id, name);
    }

    handleSetFlavor(id, name){
        this.props.setFlavor(id, name);
    }

    handleAddFlavor(){
        this.props.addSelectedFlavor();
    }

    nextStep(){
        const flavorIds = this.props.flavorList.map(item => item.flavor.id);

        console.log('Go to next step, withreviewFlavors:', this.props.reviewFlavors);
        // this.props.history.go(-1);
    }

    stepBack(){
        this.props.history.go(-1);
    }
    render() {

        console.log('FLAVOR PROPS:', this.props);

        const { categories, flavors, selectedCategory, selectedFlavor, flavorList } = this.props;

        return (
            <div className="flavor-selection">
                <h3 className="flavor-header mb-3">Please Select Tasted Flavors</h3>
                <img src={purpArrow} className="add-review-arrow col-12"/>

                <div className="row card add-review-flavor-card col-10 offset-1">
                    <div className="col-12 table-holder">
                        <FlavorList list={flavorList} />
                    </div>
                    <div className="col-12">
                        <div className="row">
                            <div className="col-12 col-md-6 dropdown-container">
                                {
                                    categories.length
                                        ? <Dropdown action={this.handleSetCategory.bind(this)} btnText={`${selectedCategory.name ? selectedCategory.name : 'Select Category'}:`} menuItems={categories} keyNames={{ id: 'id', name: 'category' }} />
                                        : null
                                }
                            </div>
                            <div className=" col-12 col-md-6 dropdown-container">
                                {
                                    true
                                        ? <Dropdown action={this.handleSetFlavor.bind(this)} btnText={`${selectedFlavor.name ? selectedFlavor.name : 'Select Flavor'}:`} menuItems={flavors} keyNames={{ id: 'id', name: 'flavor' }} />
                                        : null
                                }
                            </div>
                            <div className="col-12">
                                {
                                    selectedCategory.name && selectedFlavor.name
                                        ? <button onClick={this.handleAddFlavor.bind(this)} className="btn btn-default">Add Flavor</button>
                                        : null
                                }
                            </div>
                        </div>
                        
                    </div>
                </div>
                

            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        categories: state.juiceInfo.categories,
        selectedCategory: state.juiceInfo.selectedCategory,
        flavors: state.juiceInfo.flavors,
        selectedFlavor: state.juiceInfo.selectedFlavor,
        flavorList: state.juiceInfo.flavorList,
        singleItemInfo: state.juiceInfo.singleItemInfo,
        reviewFlavors: state.juiceInfo.reviewFlavors
    };
}

export default connect(mapStateToProps, { getCategories, setCategory, setFlavor, addSelectedFlavor })(FlavorModal);
