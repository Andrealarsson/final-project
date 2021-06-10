import React from 'react'
import { Provider } from 'react-redux'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import myTrip from './reducers/myTrip'
import user from './reducers/user'
import todos from './reducers/todos'

import Header from './components/Header'
import Footer from './components/Footer'
import LoginSignup from './pages/LoginSignup'
import MyTrip from './pages/MyTrip'
import Departure from './pages/Departure'
import Info from './pages/Info'
import Checklist from './pages/Checklist'


const reducer = combineReducers({
  user: user.reducer,
  myTrip: myTrip.reducer,
  todos: todos.reducer,
})
 const store = configureStore({ reducer: reducer })

export const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Header/>
        <Switch>
          <Route exact path="/" component={LoginSignup}/>
          <Route path="users/:userId/my-trip" component={MyTrip}/>
          <Route path="/departure" component={Departure}/>
          <Route path="/info" component={Info}/>
          <Route path='users/:userId/checklist' component={Checklist}/>
        </Switch>
        <Footer/>
      </Provider>
    </BrowserRouter>
  )
}
