import { combineReducers } from 'redux';
import { coffeeReducer } from "./coffeeReducer";
import { navReducer } from "./navReducer";

export default combineReducers({ 
    coffee: coffeeReducer,
    nav: navReducer
});

