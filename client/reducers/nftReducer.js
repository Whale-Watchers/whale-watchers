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

 import * as types from "../constants/actionTypes";

 const initialState = {
    ethPrice: 0,
    whale: '',
    whaleTable: [],
    nftComponents: '',
    loading: true,
    dataTransactions: []
  }

  const nftReducer = (state = initialState, action) => {}