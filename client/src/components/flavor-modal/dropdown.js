import React, { Component } from 'react';

class Dropdown extends Component {
    constructor(props){
        super(props);

        this.state = {
            show: false
        };
    }

    handleClick(id, name){
        this.props.action(id, name);
        this.setState({ show: false });
    }

    render(){

        const { show } = this.state;
        const { btnText, menuItems, keyNames } = this.props;

        const items = menuItems.map( item => {
            const id = item[keyNames.id];
            const name = item[keyNames.name];
            return <div onClick={() => this.handleClick(id, name)} key={id} className="dropdown-item">{name}</div>
        });

        return (
            <div className="btn-group dropdown">
                <button onClick={() => this.setState({ show: !show })} className="btn btn-secondary dropdown-toggle add-review-buttons" type="button" id="dropdownMenuButton">
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
