import React, {Component} from "react";
import axios from "axios";

class Test extends Component{



    componentDidMount(){
        this.testConnect();
    }







    // example response
    async testConnect(){
        const response = await axios.get("/api");

        console.log("basicConnect Response:", response);
    }






    render() {
        return <h1>This is a test</h1>
    }


}

export default Test;