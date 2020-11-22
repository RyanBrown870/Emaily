import { combineReducers } from 'redux';
import authReducer from './authReducer';


// keys in the below object are the keys which represent state.
export default combineReducers ({
    auth: authReducer
});
