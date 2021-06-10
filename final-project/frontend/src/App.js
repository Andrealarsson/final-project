import React from 'react'
import { Provider } from 'react-redux'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import trip from './reducers/trip'
import user from './reducers/user'
import todos from './reducers/todos'

import Header from './components/Header'
import Footer from './components/Footer'
import LoginSignup from './pages/LoginSignup'
import Trip from './pages/Trip'
import Departure from './pages/Departure'
import Info from './pages/Info'
import Checklist from './pages/Checklist'


const reducer = combineReducers({
  user: user.reducer,
  trip: trip.reducer,
  todos: todos.reducer,
})
 const store = configureStore({ reducer: reducer })

export const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Header/>
        <Switch>
          <Route exact path='/' component={LoginSignup}/>
          <Route path='/users/trip' component={Trip}/>
          <Route path='/users/departure' component={Departure}/>
          <Route path='/users/info' component={Info}/>
          <Route path='/users/checklist' component={Checklist}/>
        </Switch>
        <Footer/>
      </Provider>
    </BrowserRouter>
  )
}
