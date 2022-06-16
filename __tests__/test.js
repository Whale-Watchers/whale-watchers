
import {render, screen, cleanup} from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import Homecards from '../client/components/homecards';
// import graph from '../client/components/graph';
import Holdings from '../client/components/holdings';
import Home from '../client/components/home';
import Nav from '../client/components/nav';
import NFTCard from '../client/components/NFTCard';
import Transactions from '../client/components/transactions';
import MainContainer from '../client/containers/maincontainer';
import Dropdownlist from '../client/components/dropdownlist'
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
test('should render NFTcard', () => {
  render(<NFTCard />);
  const appElement = screen.getByTestId('nftcard');
  expect(appElement).toBeInTheDocument();
})
test('should render Navigation Bar', () => {
  const props = { name: 'name', picture: 'picUrl'};
  render(<Nav user={props} />);
  const navigationElement = screen.getByTestId('nav');
  expect(navigationElement).toBeInTheDocument();
})


// test('should render Homecards', () => {
//   render(<Homecards />);
//   const homecardsElement = screen.getByTestId('homecards');
//     expect(homecardsElement).toBeInTheDocument();
// })
// test('should render HoldingsContainer', () => {
//   render(<Holdings />);
//   const holdingsContainer = screen.getByTestId('holdings');
//   expect(holdingsContainer).toBeInTheDocument();
// })
// test('should render Transactions', () => {
//   render(<Transactions />);
//   const appElement = screen.getByTestId('transactions');
//   expect(appElement).toBeInTheDocument();
// })

// test('should render Dropdownlist', () => {
//   render(<Dropdownlist />);
//   const appElement = screen.getByTestId('dropdownlist');
//   expect(appElement).toBeInTheDocument();
// })

// ///Ozair is messing with this-------------------------------------------------------------------------
// const test1 = ['melon', 'circle','apple']

// test('Contains apple', () => {
//   expect(test1).toContain('apple');
// });


// test('true', () => {
//   expect(true).toBe(true);
// })







///PERLA is messing with this *Dropdownlist*-------------------------------------------------------------------------

