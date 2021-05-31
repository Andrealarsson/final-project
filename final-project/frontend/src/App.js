import React from 'react'
import { Provider } from 'react-redux'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import user from './reducers/user'

import Login from './pages/Login'
import MyTrip from './pages/MyTrip'
import Departure from './pages/Departure'
import Info from './pages/Info'
import Checklist from './pages/Checklist'


const reducer = combineReducers({
  user: user.reducer
})
 const store = configureStore({ reducer })

export const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Switch>
          <Route path="/login" component={Login}/>
          <Route exact path="/my-trip" component={MyTrip}/>
          <Route path="/my-trip/departure" component={Departure}/>
          <Route path="/info" component={Info}/>
          <Route path="/checklist" component={Checklist}/>
        </Switch>
      </Provider>
    </BrowserRouter>
  )
}
