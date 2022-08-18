/**
 * ************************************
 *
 * @module  actions.js
 * @author
 * @date
 * @description Action Creators ADDS OBJECTS
 *
 * ************************************
 */

// import actionType constants
import * as types from "../constants/actionTypes";

export const setWhaleActionCreator = (whaleAddress) => ({
    type: types.SET_WHALE,
    payload: whaleAddress,
  });

  export const setEtherActionCreator = (price) => ({
    type: types.GET_ETHER,
    payload: price,
  })