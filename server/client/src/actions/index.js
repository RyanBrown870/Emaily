import axios from "axios";
import { FETCH_USER } from "./types";

// redux thunk passes in dispatch automatically
export const fetchUser = () => async (dispatch) => {
  const res = await axios.get("/api/current_user"); // from authRoutes in server, this will do the API call through this route.
    
  dispatch({ type: FETCH_USER, payload: res.data });
};

// to update redux store with credits added, post call to this route and send token in post. Then send user model payload
export const handleToken = token => async dispatch => {
  const res = await axios.post('/api/stripe', token);

  dispatch({ type: FETCH_USER, payload: res.data});
}

export const submitSurvey = (values, history) => async dispatch => {
  const res = await axios.post('/api/surveys', values);     // send post request with our form values

  history.push('/surveys');
  dispatch({ type: FETCH_USER, payload: res.data });        // dispatch action to redux store
};