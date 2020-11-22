// Redux Management
import 'materialize-css/dist/css/materialize.min.css';
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import App from "./components/App";
import reducers from './reducers';
import reduxThunk from "redux-thunk"; 

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
