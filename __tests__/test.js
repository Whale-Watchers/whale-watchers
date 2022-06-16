
import {render, screen, cleanup} from '@testing-library/react';
import React from 'react';
import homecards from '../client/components/homecards';
// import graph from '../client/components/graph';
import holdings from '../client/components/holdings';
import home from '../client/components/home';
import nav from '../client/components/nav';
import NFTCard from '../client/components/NFTCard';
import transactions from '../client/components/transactions';
import maincontainer from '../client/containers/maincontainer';
import dropdownlist from '../client/components/dropdownlist'
import App from '../client/App'

//import react components 

//1. Test if app.jsx is rendering
// describe('')


// test('should render App component', () => {
//   render(<App/>);
//   const appElement = screen.getAllByTestId('app');
//     expect(appElement).toBeInTheDocument();
// })
///Ozair is messing with this-------------------------------------------------------------------------
// test('should render NTFcard', () => {
//   render(<NFTCard />);
//   const appElement = screen.getAllByTestId('nftcard');
//     // expect(appElement).toBeInTheDocument();
// })
///Ozair is messing with this-------------------------------------------------------------------------
const test1 = ['melon', 'circle','apple']

test('Contains apple', () => {
  expect(test1).toContain('apple');
});


test('true', () => {
  expect(true).toBe(true);
})
