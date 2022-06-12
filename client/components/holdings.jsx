import React, { Component } from 'react';

class Holdings extends Component {
    render() {
        return (
            <div id="holdingsContainer">
                <h3>Holdings</h3>
                <div id='tableHeadingsWrapper'>
                    <h5 className="tableHeading">Name</h5>
                    <h5 className="tableHeading">Email</h5>
                    <h5 className="tableHeading">Street</h5>
                    <h5 className="tableHeading">City</h5>
                </div>
            </div>
        );
    }
}

export default Holdings;