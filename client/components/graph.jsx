import React, { Component } from 'react';
import Plot from 'react-plotly.js';

class Graph extends Component {
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
                    layout={{ width: 420, height: 240, title: 'Whale 1' }}
                />
            </div>
        );
    }
}

export default Graph;