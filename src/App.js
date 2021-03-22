import React, {useState} from 'react'
import Header from './component/Header'
import Filter from './component/Filter'
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles'
import ListTodo from './component/LIstTodo'
import Pagination from './component/Pagination'

const useStyleApp = makeStyles({
  root: {
    // background: '#aa4b6b',
    // background: 'linear-gradient(to left, #3b8d99, #6b6b83, #aa4b6b)'
  }
})

export default function App() {
  const classesApp = useStyleApp()
  const [todos, setTodos] = useState([])
  const [stateDate, setStateDate] = useState(false)
  const [view, setView] = useState('All')
  const [pages, setPage] = useState(0)

  function addTodo (value) {
    setTodos([...todos, value]) 
  }

  function deleteTodo (todoIndex) {
    const newTodo = todos.filter((todo) => todo.id !== todoIndex)
    setTodos(newTodo)
    if(pages >= newTodo.length/5) {
      setPage(pages-1)
    }
  }

  function checkedTodo (idTodo) {
    setTodos (
      todos.filter(item => {
        if (item.id === idTodo) {
          item.checked = !item.checked
        }
        return item
      })
  
    )
  }

  function sortByDate (valueDate) {
    setStateDate(valueDate)
  }

  function handlerChange (e, page) {
    if(page === 1) setPage(0)
    else setPage(page-1)
  }
  
  function changeTaskText (value, id) {
    const newArray = todos.map(item => {
      if(item.id === id){
        item.title = value
      } return newArray
    })}  
 
  return (
    <div className = {classesApp.root}>
      <Box display= 'flex' justifyContent = 'center' m = {1}>
        <h1>My ToDo List</h1>
      </Box>
        <Header  addTodo = {addTodo} />
        <Filter sortByDate = {sortByDate} setView={setView} />
        <ListTodo todos = {todos} deleteTodo ={deleteTodo} checkedTodo={checkedTodo} stateDate = {stateDate} page = {pages} view={view} changeTaskTitle = {changeTaskText} />
        <Pagination todos = {todos} handlerChange = {handlerChange}  />
    </div>
  )
}