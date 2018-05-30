import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { connect } from 'react-redux';
import { getCategories, setCategory, setFlavor, addSelectedFlavor } from '../../actions';
import './flavor-modal.css';
import Dropdown from './dropdown';
import FlavorList from './flavor_list';

class FlavorModal extends Component {


    componentDidMount(){
        this.props.getCategories();
        console.log(this.props);
    }

    handleSetCategory(id, name){
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

        const { categories, flavors, selectedCategory, selectedFlavor, flavorList } = this.props;

        return (
            <div className="flavor-selection">
                <h1 className="flavor-header mb-5">Select Flavors Tasted</h1>
                <div className="row">
                    <div className="col-4">
                        <div>
                            {
                                categories.length
                                    ? <Dropdown action={this.handleSetCategory.bind(this)} btnText={`${selectedCategory.name ? selectedCategory.name : 'Category'}:`} menuItems={categories} keyNames={{id: 'id', name: 'category'}} />
                                    : null
                            }
                        </div>
                        <div className="my-3">
                            {
                                flavors.length
                                    ? <Dropdown action={this.handleSetFlavor.bind(this)} btnText={`${selectedFlavor.name ? selectedFlavor.name : 'Select Flavor'}:`} menuItems={flavors} keyNames={{ id: 'id', name: 'flavor' }} />
                                    : null
                            }
                        </div>
                        <div>
                            {
                                selectedCategory.name && selectedFlavor.name
                                    ? <button onClick={this.handleAddFlavor.bind(this)} className="btn btn-default">Add Flavor</button>
                                    : null
                            }
                        </div>
                        <div className="mt-5">
                            <button onClick={this.stepBack.bind(this)} className="btn btn-default mx-3">Cancel</button>
                            {
                                flavorList.length
                                    ? <button type="button" onClick={this.nextStep.bind(this)} className="btn btn-default mx-3">Done</button>
                                    : null
                            }
                        </div>
                    </div>
                    
                    <div className="col-8">
                            <FlavorList list={flavorList}/>
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
