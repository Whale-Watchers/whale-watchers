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
  nftComponents: '',
  loading: true,
  dataTransactions: [],
  };

  const nftReducer = (state = initialState, action) => {
    let whale;
    let ethPrice;

    switch (action.type) {
      case types.SET_WHALE:
        console.log(`%c ${action.payload}`, 'background-color: green');
        whale = action.payload.currentWhale
        console.log('set whale action activated');


        return {
          ...state,
          whale,
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