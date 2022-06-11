import React, { Component } from 'react';
import Plot from 'react-plotly.js';

class Graph extends Component {
    render() {
        return(
            <div id="Graph">
               <Plot
                    data={[
                    {
                        x: [1, 2, 3],
                        y: [2, 6, 3],
                        type: 'scatter',
                        mode: 'lines+markers',
                        marker: {color: 'red'},
                    },
                    {type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
                    ]}
                    layout={ {width: 320, height: 240, title: 'Whale Name'} }
                />
            </div>
        );
    }
}

export default Graph;