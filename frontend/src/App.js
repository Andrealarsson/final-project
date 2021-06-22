import React from "react";
import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import trip from "./reducers/trip";
import user from "./reducers/user";
import todos from "./reducers/todos";

import AuthProvider from "./components/AuthProvider";
import LoginSignup from "./pages/LoginSignup";
import Trip from "./pages/Trip";
import Info from "./pages/Info";
import Checklist from "./pages/Checklist";

const reducer = combineReducers({
  user: user.reducer,
  trip: trip.reducer,
  todos: todos.reducer,
});
const store = configureStore({ reducer: reducer });

export const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AuthProvider />
        <Switch>
          <Route exact path="/" component={LoginSignup} />
          <Route path="/users/trip" component={Trip} />
          <Route path="/users/info" component={Info} />
          <Route path="/users/checklist" component={Checklist} />
        </Switch>
      </Provider>
    </BrowserRouter>
  );
};
