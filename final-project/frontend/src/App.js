import React from 'react'
import { Provider } from 'react-redux'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import user from './reducers/user'
import myTrip from './reducers/myTrip'

import Header from './components/Header'
import Footer from './components/Footer'
import Login from './pages/Login'
import MyTrip from './pages/MyTrip'
import Departure from './pages/Departure'
import Info from './pages/Info'
import Checklist from './pages/Checklist'


const reducer = combineReducers({
  user: user.reducer,
  myTrip: myTrip.reducer,
})
 const store = configureStore({ reducer })

export const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Header/>
        <Switch>
          <Route exact path="/" component={Login}/>
          <Route exact path="/my-trip" component={MyTrip}/>
          <Route path="/my-trip/departure" component={Departure}/>
          <Route path="/info" component={Info}/>
          <Route path="/checklist" component={Checklist}/>
        </Switch>
        <Footer/>
      </Provider>
    </BrowserRouter>
  )
}
