import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import Board from './containers/Board';

import {LocalContextProvider} from "./context/LocalContext";

ReactDOM.render(
  <LocalContextProvider>
    <Board />
  </LocalContextProvider>,
  document.getElementById("root")
);
