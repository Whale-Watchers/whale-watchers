/**
 * ************************************
 *
 * @module  marketsReducer
 * @author
 * @date
 * @description reducer for market data
 *
 * ************************************
 */
import axios from "axios";
import whaleTable from "../docs/whaleTable";
import * as types from "../constants/actionTypes";

 const initialState = {
  whaleTable,
  ethPrice: '',
  whale: '',
  nftComponents: {},
  loading: true,
  dataTransactions: [],
  };

  const nftReducer = (state = initialState, action) => {
    let whale;
    let ethPrice;
    let nftComponents
    let dataTransactions

    switch (action.type) {
      case types.SET_WHALE:
        // console.log(`%c ${action.payload}`, 'background-color: green');
        whale = action.payload.currentWhale
        nftComponents = action.payload.nftComponentsData
        dataTransactions = action.payload.transactionData
        // console.log(`%c ${whale}`, 'background-color: pink');
        // console.log(`%c ${nftComponents}`, 'background-color: magenta');
        // console.log(`%c ${dataTransactions}`, 'background-color: blue');

// transactionData, nftComponentsData, currentWhale
        return {
          ...state,
          whale,
          nftComponents,
          dataTransactions,
        }


      case types.GET_ETHER:

        // console.log(`in nfts => ${ethPrice}`)
        // console.log('%c get ether action activated', 'color: pink');


        ethPrice = action.payload

        return {
          ...state,
          ethPrice
        }
        
        

        

      default: {
        return state
      }
    }
  }

  export default nftReducer