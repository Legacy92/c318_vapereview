import React, {Component} from "react";
import { Link } from 'react-router-dom';

class LandingPage extends Component {
    constructor(props) {
        super(props);
    }


    render(){
        return (
            <div>
                <h1>This is the Landing page!</h1>
                <input type="text" placeholder = "search" />
               <Link to = "/multiple_results">Browse</Link>
               <Link to = "/add-product">Add Juice</Link>
               <Link to = "/single-results">Random</Link>
            </div>
        )
    }


}

export default LandingPage;