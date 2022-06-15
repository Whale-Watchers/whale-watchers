import { combineReducers } from 'redux';

// import all reducers here
import nftReducer from './nftReducer';


// combine reducers
const reducers = combineReducers({
  // if we had other reducers, they would go here
  nfts: nftReducer,
});

// make the combined reducers available for import
export default reducers;