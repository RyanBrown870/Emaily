import { DELETE_SURVEYS, FETCH_SURVEYS } from "../actions/types";

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_SURVEYS:
      return action.payload;
    case DELETE_SURVEYS:
      return action.payload;
    default:
      return state;
  }
}
