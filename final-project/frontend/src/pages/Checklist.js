import React from 'react'

// import todos from './reducers/todos'
import AddTodo from '../components/AddTodo'
// import TodoList from '../components/TodoList'
// import RemoveAllTodos from '../components/RemoveAllTodos'
import styled from 'styled-components'

// const reducer = combineReducers({
//   todos: todos.reducer
// })

// const store = configureStore ({ reducer })

const Checklist = () => {
  return (
    <>
       <AddTodo/>
        <h1>checkatttt</h1>
        {/* <TodoList/>
        <RemoveAllTodos/> */}
    </>
  
  )
}
export default Checklist