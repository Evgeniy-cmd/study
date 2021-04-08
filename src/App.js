import React, {useState, useEffect} from 'react'
import Header from './component/Header'
import Filter from './component/Filter'
import Box from '@material-ui/core/Box';
import ListTodo from './component/LIstTodo'
import Pagination from './component/Pagination'
import {deleteTask, getTask, newTask, doneTask} from './userAPI'
import AlertError from './AlertError'


export default function App() {
  const [todos, setTodos] = useState([])
  const [stateCreatedAt, setStateCreatedAt] = useState(false)
  const [view, setView] = useState('All')
  const [page, setPage] = useState(0)
  const [error, setError] = useState('')
  const [countTodos, setCountTodos] = useState(0)

  
  useEffect (() =>  {
    async function func() {
    const response = await getTask()
    if(response.status === 200) {
      setTodos(response.data)
    } 
  }
  func()}, [])

  async function addNewTodo (newTodo) {
    const response = await newTask({name: newTodo.name, done: newTodo.done})
      if(response.status === 200){
        setTodos([...todos, {
        ...response.data}])
        }
        setError(response.message)
  }
  
  async function deleteTodo (uuid) {
    await deleteTask(uuid)
    setTodos(todos.filter((todo) => todo.uuid !== uuid))
    if(page >= (todos.length - 1) / 5) {
      setPage(page-1)
    }
  }

  async function doneTodo (uuid) {
    const checked = todos.find(item => item.uuid === uuid)
    const response = await doneTask(uuid, {name: checked.name, done: !checked.done})
    if(response.status === 200) {
    setTodos (
      todos.filter(item => {
        if (item.uuid === uuid) {
          item.done = response.data.done
        }
        return item
      })
  
    )
  }}

  function sortByCreatedAt (valueCreatedAt) {
    setStateCreatedAt(valueCreatedAt)
  }

  function handlerChange (e, page) {
    if(page === 1) setPage(0)
    else setPage(page-1)
  }

  async function changeTaskName (value, uuid) {
    const response = await doneTask(uuid, {name: value})
    console.log(uuid)
    if(response.status === 200) {
    setTodos(todos.map(item => {
      if(item.uuid === uuid){
        item.name = value
      } return item
    }))}   
  }

  // function viewTodos (todos) {
    
  //   setCountTodos(Math.ceil(todos.length / 5))
  // }
  
  
  return (
    <div>
      <Box display= 'flex' justifyContent = 'center' m = {1} p = {10}>
        <h1>My ToDo List</h1>
      </Box>
        <Header  addTodo = {addNewTodo} />
        <Filter sortByCreatedAt = {sortByCreatedAt} setView={setView} />
        <ListTodo
        todos = {todos}
        deleteTodo ={deleteTodo}
        doneTodo={doneTodo}
        stateCreatedAt = {stateCreatedAt}
        page = {page}
        view = {view}
        changeTaskName = {changeTaskName}
        />
        <Pagination todos = {todos} handlerChange = {handlerChange}  countTodos = {countTodos} />
        <AlertError error = {error} />
    </div>
  )
}