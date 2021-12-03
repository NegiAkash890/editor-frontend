import {createStore} from "redux";

import reducer from "../reducers/index";

export const store = createStore(reducer,{trace: true, traceLimit: 25},
        typeof window === "object" &&
        typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== "undefined"
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : (f) => f
);