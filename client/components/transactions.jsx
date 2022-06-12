import React, { Component } from 'react';

class Transactions extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <div id="transactionsContainer">
                <h3>Transactions</h3>
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

export default Transactions;