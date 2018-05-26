import React, { Component } from 'react';

class Dropdown extends Component {
    constructor(props){
        super(props);

        this.state = {
            show: false
        };
    }

    render(){

        const { show } = this.state;
        const { btnText, menuItems, action } = this.props;

        const items = menuItems.map(({category, id}) => {
            return <div onClick={() => action(id)} key={category} className="dropdown-item">{category}</div>
        });

        return (
            <div className="dropdown">
                <button onClick={() => this.setState({ show: !show })} className="btn btn-secondary dropdown-toggle" type="button">
                    {btnText}
                </button>
                <div className={`dropdown-menu ${show ? 'show' : ''}`}>
                    {items}
                </div>
            </div>
        );
    }
}

export default Dropdown;
