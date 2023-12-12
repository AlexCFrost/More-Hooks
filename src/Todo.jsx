import React from 'react'
import { ACTIONS } from './App.jsx'

function Todo({todo, dispatch, originalName}) {
  return (
    <>
     <div className='task-todo'>
           <span>{todo.name}</span>
           <button onClick={()=> dispatch({type: ACTIONS.TOOGLE_TODO, payload: {id: todo.id, originalName: originalName}})}>Toogle</button>
     </div> 
    </>
  )
}

export default Todo
