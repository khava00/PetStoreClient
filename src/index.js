import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import store from "./components/redux/store";
import { Provider } from "react-redux";
import "./index.css";
import setup from "./components/redux/Actions/Interceptor";
import { BrowserRouter as Router } from "react-router-dom";
// ReactDOM.render(
//     <Provider store={store}>
//         <Router>
//             <App />
//         </Router>
//     </Provider>,

//     document.getElementById("root")
// );
ReactDOM.hydrate(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
setup(store);
