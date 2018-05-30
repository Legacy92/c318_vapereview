import React, {Component} from "react";
import axios from "axios";
import { connect } from 'react-redux';
import { authTest } from '../actions';

class Test extends Component{



    componentDidMount(){
        //  this.testConnect();
        // this.addProduct();
        // this.createUser();
        // this.getReviewData();

        this.props.authTest();
    }


    // example response
    async testConnect(){
        const response = await axios.get("/api/test");
        console.log("basicConnect Response:", response);
    }

    // pull all review data
    async getReviewData(){
        const response = await axios.get("/api/multiple-results");
        console.log("Review Data:", response);
    }

     // create user
    async createUser(){
        const response = await axios.post("/api/create-user");
        console.log("createUser Response:", response);
    }

    //authenticate user
    async authenticateUser(){
        const response = await axios.get("/api/log-in");
        console.log("user login information received");
    }

      // add product
      async addProduct(){
        const response = await axios.post("/api/add-product");
        console.log("addProduct Response:", response);
    }

    //add review
    async addReview(){
        const response = await axios.post('/api/add-review');
        console.log("addReview response:", response);
    }



    render() {
        return <h1>This is a test</h1>
    }


}

export default connect(null, { authTest })(Test);