import React, { Component } from 'react';
import Plot from 'react-plotly.js';

class Graph extends Component {
    constructor(props) {
        super(props),
        this.state = {
            whale: "Snoop Dogg (A.K.A. Cozomo de’ Medici)",
            wallet: "0xCe90a7949bb78892F159F428D0dC23a8E3584d75",
            time_series: {
                "1635471569":
                {   
                    "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d": "VALUE",
                    "direction": "buy",
                    "BoredApeYachtClub": "VALUE",
                    "BAYC": "VALUE"
                },
                "1635769686":
                {
                    "0x60e4d786628fea6478f785a6d7e704777c86a7c6": "VALUE",
                    "direction": "buy",
                    "MutantApeYachtClub": "VALUE",
                    "MAYC": "VALUE"
                },
                "1635770435":
                {
                    "0x60e4d786628fea6478f785a6d7e704777c86a7c6": "VALUE",
                    "direction": "sell",
                    "MutantApeYachtClub": "VALUE",
                    "MAYC": "VALUE"
                },
                "1638396731":
                {
                    "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d": "VALUE",
                    "direction": "sell",
                    "BoredApeYachtClub": "VALUE",
                    "BAYC": "VALUE"
                },
                "1642890008":
                {
                    "0x0823c8d1789bcb472c16a60bb9ab317c2647d2b5": "VALUE",
                    "direction": "buy",
                    "The Shark Mob": "VALUE",
                    "TSM": "VALUE"
                },
                "1642890008":
                {
                    "0x0823c8d1789bcb472c16a60bb9ab317c2647d2b5": "VALUE",
                    "direction": "buy",
                    "The Shark Mob": "VALUE",
                    "TSM": "VALUE"
                }
            }
        }
    }

    // fetch request to back end data endpoint
    async componentDidMount() {

        // get time stamps
        const x_axis = [];
        for (timeStamp of Object.keys(this.state.time_series)) {
            const date = new Date(timeStamp * 1000).toLocaleDateString('en-US');
            const time = new Date(timeStamp * 1000).toLocaleTimeString('en-US');
            // x.push([date, time]);
            x_axis.push(date);
        }
    }

    render() {
        return (
            <div id="Graph">
                <Plot
                    data={[
                      {
                        x: ['10/28/2021', '11/1/2021', '11/1/2021', '12/1/2021', '1/22/2022'],
                        y: [1, 1, 1, 2, 2, 2],
                        type: 'scatter',
                        mode: 'lines+markers',
                        marker: {color: 'darkblue'},
                        name: 'Bored Ape Yacht Club'
                      },
                      {type: 'line', x: ['10/28/2021', '11/1/2021', '11/1/2021', '12/1/2021', '1/22/2022'], y: [0, 1, 2, 2, 2, 2], marker: {color: 'orange'}, name: 'Mutant Ape Yacht Club'
                      },
                      {type: 'line', x: ['10/28/2021', '11/1/2021', '11/1/2021', '12/1/2021', '1/22/2022'], y: [0, 0, 0, 0, 1, 2], marker: {color: 'purple'}, name: 'SharkMob'
                      }
                    ]}
                    layout={ {width: '70%', height: '70%', autosize: true, responsive: true, title: 'Snoop Dogg'} }
                  />

            </div>
        );
    }
}

export default Graph;