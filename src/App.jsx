import { useState, useReducer, useRef } from 'react'
import './App.css'
import Todo from './Todo.jsx'

 export const ACTIONS = {
    ADD_TODO: 'add-todo',
    TOOGLE_TODO: 'toogle-todo'
}

function reducer(todos, action){
    switch(action.type){
        case ACTIONS.ADD_TODO:
            return  [...todos, newTodo(action.payload.name, action.payload.originalName)]
        case ACTIONS.TOOGLE_TODO:
            return todos.map((todo) =>{
                if(todo.id === action.payload.id){
                    const newName = todo.name === 'Content is hidden' ? action.payload.originalName : 'Content is hidden';
                    return {...todo, name:newName, complete: !todo.complete}
                }
                return todo
            })
        default:
            return todos
    }
}

function newTodo(name, originalName){
    return{id: Date.now(), name: name, originalName: originalName, complete: false }
}

function App() {
    const[todos, dispatch] = useReducer(reducer, [])
    const[name, setName] = useState('')
    const inputRef = useRef(null);

    function handleSubmit(e){
        e.preventDefault()
        dispatch({type: ACTIONS.ADD_TODO, payload: {name: name, originalName: name}})
        setName('')
    }

    function handleFocusClick() {
        inputRef.current.focus();
      }

    return(
        <div className='input-field'>
            <form onSubmit={handleSubmit}>
              <input type="text" value={name} onChange={e => setName(e.target.value)}  ref={inputRef}/>
           </form>
            {todos.map((todo) =>{
            return <Todo key = {todo.id} todo = {todo} dispatch={dispatch} originalName={todo.originalName} />
            })}
            <button onClick={handleFocusClick}>Focus Input</button>

        </div>

    )
}

export default App