import { applyMiddleware, createStore }  from "redux";


import promise from "redux-promise-middleware";
import thunk from "redux-thunk";

import reducers from "./reducers";

const middleware = applyMiddleware(thunk);

export default initialState =>
  createStore(reducers, initialState, middleware);
