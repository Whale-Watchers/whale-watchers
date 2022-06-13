import axios from 'axios';
import React, { Component } from 'react';
import { useParams } from 'react-router-dom';

// class Holdings extends Component {
//     constructor(props) {
//         super(props);
//     }
const Holdings = () => {
    let userId = useParams();
    console.log('userId--->', userId);

    const whaleHoldings = {
        holdings: []
    }
    axios.get(`http://localhost:3000/database/getHoldings/${userId}`).then(res => {
        whaleHoldings.holdings.push(res.data.holdings);
    });

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

    )
}

export default Holdings;