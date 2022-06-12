import React, { Component } from 'react';
import Plot from 'react-plotly.js';

class Graph extends Component {
    constructor(props) {
        super(props),
        this.state = {
            whale: "Snoop Dogg (A.K.A. Cozomo de’ Medici)",
            wallet: "0xCe90a7949bb78892F159F428D0dC23a8E3584d75",
            times: []
        }
    }

    // fetch request to back end data endpoint
    async componentDidMount() {
        
    }

    render() {
        return (
            <div id="Graph">
                <Plot
                    data={[
                        {
                            x: [1, 2, 3],
                            y: [2, 6, 3],
                            type: 'scatter',
                            mode: 'lines+markers',
                            marker: { color: 'darkblue' },
                        },
                        { type: 'bar', x: [1, 2, 3], y: [2, 5, 3], marker: { color: 'lightblue' }, },
                    ]}
                    layout={{ width: 420, height: 240, title: `${this.state.whale}` }}
                />
            </div>
        );
    }
}

export default Graph;