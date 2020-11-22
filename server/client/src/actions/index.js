import axios from "axios";
import { FETCH_USER } from "./types";

// redux thunk passes in dispatch automatically
export const fetchUser = () => async (dispatch) => {
  const res = await axios.get("/api/current_user"); // from authRoutes in server, this will do the API call through this route.
    
  dispatch({ type: FETCH_USER, payload: res.data });
};
