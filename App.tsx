import React from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { reducers } from "./src/reducers";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension"; // redux-chrome-tool
import AppScreen from "./src/containers/AppScreen/AppScreen";

export default function App() {
  const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(thunk))
  ); // redux-chrome-tool enabled
  return (
    <Provider store={store}>
      <AppScreen />
    </Provider>
  );
}
