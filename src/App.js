import React, { useState, useEffect } from 'react'
import Header from './component/Header'
import Filter from './component/Filter'
import Box from '@material-ui/core/Box';
import ListTodo from './component/LIstTodo'
import Pagination from './component/Pagination'
import { deleteTask, getTask, newTask, doneTask } from './userAPI'
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert'

const querystring = require('querystring')

export default function App() {
  const [todos, setTodos] = useState([])
  const [stateCreatedAt, setStateCreatedAt] = useState(false)
  const [view, setView] = useState('All')
  const [page, setPage] = useState(0)
  const [isError, setIsError] = useState(false)
  const [errMessage, setErrMessage] = useState('')
  const [countTodos, setCountTodos] = useState(0)
  const [check, setCheck] = useState('')
  const [filterDate, setFilterDate] = useState('asc')
  const [textValue, setTextValue] = useState('')

  useEffect(() => {
    async function func() {
      const response = await getTask(querystring.stringify({
        page: page,
        order: 'asc'
      }))
      if (response.status === 200) {
        setTodos(response.data.rows)
        setCountTodos(Math.ceil(response.data.count / 5))
      }
    }
    func()
  }, [])

  async function addNewTodo(newTodo) {
    try {
      const response = await newTask({ name: newTodo.name })
      if (response.status === 200) {
        const resGet = await getTask(querystring.stringify({
          page: page,
          done: check,
          order: filterDate
        }))
        setTodos(resGet.data.rows)
        setCountTodos(Math.ceil(resGet.data.count / 5))
      }
    } catch (error) {
      setIsError(true)
      setErrMessage('Task already exist or must be longer than two characters')
    }}


    async function deleteTodo(uuid) {
      const response = await deleteTask(uuid)
      if (response.status === 200) {
        const resGet = await getTask(querystring.stringify({
          page: page,
          done: check,
          order: filterDate
        }))
        setTodos(resGet.data.rows)
        setCountTodos(Math.ceil(resGet.data.count / 5))
      }
      setErrMessage(response.message)
    }

    async function doneTodo(uuid) {
      const checked = todos.find(item => item.uuid === uuid)
      const response = await doneTask(uuid, { name: checked.name, done: !checked.done })
      if (response.status === 200) {
        setTodos(
          todos.filter(item => {
            if (item.uuid === uuid) {
              item.done = response.data.done
            }
            return item
          })

        )
      }
      setErrMessage(response.message)
    }

    async function filters(statusItem) {
      setCheck(statusItem)
      const response = await getTask(querystring.stringify({
        page: page,
        done: statusItem,
        order: filterDate
      }))
      setTodos(response.data.rows)
      setView(
        statusItem
      )
      setCountTodos(Math.ceil(response.data.count / 5))
    }

    async function filtersForDate(valueDate) {

      setFilterDate(valueDate)
      const response = await getTask(querystring.stringify({
        page: page,
        order: valueDate,
        done: check
      }))
      setTodos(response.data.rows)
      setStateCreatedAt(valueDate)
      setCountTodos(Math.ceil(response.data.count / 5))
    }

    async function handlerChange(e, page) {
      if (page === 1) setPage(0)
      else setPage(page - 1)

      const response = await getTask(querystring.stringify({
        page: page - 1,
        order: filterDate,
        done: check
      }))
      setTodos(response.data.rows)
    }

    async function changeTaskName(value, uuid) {
      try {
        const response = await doneTask(uuid, { name: value })
      if (response.status === 200) {
        setTodos(todos.map(item => {
          if (item.uuid === uuid) {
            item.name = value
          } return item
        }))
      }
      } catch (error) {
        setIsError(true)
        setErrMessage('Task already exist or must be longer than two characters')
      } 
    }
    
    const handlerValueText = (event) => {
      if (event.key === "Enter") {
        try {
          if (event.target.value.trim() === "") {
            event.target.value = ""
            throw new Error("Input your task!")
          }
          event.preventDefault()
          addNewTodo(event)
          setTextValue('')
          event.target.value = ""
        } catch (error) {
          setErrMessage(error.message)
          setIsError(true)
        }
      } else {
        setTextValue(event.target.value)
      }
    }
  

    return (
      <div>
        <Box display='flex' justifyContent='center' m={1} p={10}>
          <h1>My ToDo List</h1>
        </Box>
        <Header handlerValueText = {handlerValueText} />
        <Filter
          filters={filters}
          filtersForDate={filtersForDate} />
        <ListTodo
          todos={todos}
          deleteTodo={deleteTodo}
          doneTodo={doneTodo}
          stateCreatedAt={stateCreatedAt}
          page={page}
          view={view}
          changeTaskName={changeTaskName}
        />
        <Pagination
          todos={todos}
          handlerChange={handlerChange}
          countTodos={countTodos} />
        <Snackbar
          open={isError}
          onClose={() => setIsError(false)}
          autoHideDuration={5000}>
          <Alert
            severity="error"
            onClose={() => setIsError(false)} >
            {errMessage}
          </Alert>
        </Snackbar>
      </div>
    )
  }