import { FETCH_USER } from '../actions/types'

export default function(state = null, action) {
   
    switch (action.type) {
        case FETCH_USER: 
        return action.payload || false;             // if not logged in, action.payload will be empty string and falsy.

        default:
            return state;
    }
}
