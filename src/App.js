import React, {useState, useEffect} from 'react'
import Header from './component/Header'
import Filter from './component/Filter'
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles'
import ListTodo from './component/LIstTodo'
import Pagination from './component/Pagination'
import {deleteTask, getTask, newTask, doneTask} from './userAPI'
import AlertError from './AlertError'

const useStyleApp = makeStyles({
  root: {
    // background: '#aa4b6b',
    // background: 'linear-gradient(to left, #3b8d99, #6b6b83, #aa4b6b)'
  }
})

export default function App() {
  const classesApp = useStyleApp()
  const [todos, setTodos] = useState([])
  const [stateCreatedAt, setStateCreatedAt] = useState(false)
  const [view, setView] = useState('All')
  const [pages, setPage] = useState(0)
  const [error, setError] = useState('')
  
  useEffect (() =>  {
    async function func() {
    const response = await getTask(2)
    if(response.status === 200) {
      setTodos(response.data)
    } 
  }
  func()}, [])

  async function addNewTodo (newTodo) {
    const response = await newTask(2 , {name: newTodo.name, done: newTodo.done})
      if(response.status === 200){
        setTodos([...todos, {
        ...response.data}])
        }
        setError(response.message)
  }
  
  async function deleteTodo (todoIndex) {
    await deleteTask(2, todoIndex)
    setTodos(todos.filter((todo) => todo.uuid !== todoIndex))
    if(pages >= (todos.length - 1) / 5) {
      setPage(pages-1)
    }
  }

  async function doneTodo (uuidTodo) {
    const checked = todos.find(item => item.uuid === uuidTodo)
    const response = await doneTask(2, uuidTodo, {done: !checked.done})
    if(response.status === 200) {
    setTodos (
      todos.filter(item => {
        if (item.uuid === uuidTodo) {
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

  async function changeTaskName (value, id) {
    const response = await doneTask(2, id, {name: value})
    if(response.status === 200) {
    setTodos(todos.map(item => {
      if(item.uuid === id){
        item.name = value
      } return item
    }))}   
  }


  
  return (
    <div className = {classesApp.root}>
      <Box display= 'flex' justifyContent = 'center' m = {1}>
        <h1>My ToDo List</h1>
      </Box>
        <Header  addTodo = {addNewTodo} />
        <Filter sortByCreatedAt = {sortByCreatedAt} setView={setView} />
        <ListTodo todos = {todos} deleteTodo ={deleteTodo} doneTodo={doneTodo} stateCreatedAt = {stateCreatedAt} page = {pages} view={view} changeTaskName = {changeTaskName} />
        <Pagination todos = {todos} handlerChange = {handlerChange}  />
        <AlertError error = {error} />
    </div>
  )
  }