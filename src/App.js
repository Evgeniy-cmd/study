import React, { useState, useEffect } from 'react'
import Header from './component/Header'
import Filter from './component/Filter'
import Box from '@material-ui/core/Box';
import ListTodo from './component/LIstTodo'
import Pagination from './component/Pagination'
import { deleteTask, getTask, newTask, doneTask } from './userAPI'
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert'
import axios from 'axios'

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
    const response = await newTask({ name: newTodo.name, done: newTodo.done })
    if (response.status === 200) {
      if (todos.length < 5)
        setTodos([...todos, {
          ...response.data
        }])
    }
    setCountTodos(Math.ceil(response.data.count / 5))
    setErrMessage(response.message)
  }

  async function deleteTodo(uuid) {
    const response = await deleteTask(uuid)
    if (response.status === 204) {
      const resGet = await getTask(querystring.stringify({
        page: page,
        done: check,
        order: filterDate
      }))
      setTodos(resGet.data.rows)
      setCountTodos(Math.ceil(response.data.count / 5))
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

  // function sortByCreatedAt(valueCreatedAt) {
  //   setStateCreatedAt(valueCreatedAt)
  // }

  async function handlerChange(e, page) {
    if (page === 1) setPage(0)
    else setPage(page - 1)

    const response = await getTask(querystring.stringify({
      page: page,
      order: filterDate,
      done: check
    }))
    setTodos(response.data.rows)
  }

  async function changeTaskName(value, uuid) {
    const response = await doneTask(uuid, { name: value })
    if (response.status === 200) {
      setTodos(todos.map(item => {
        if (item.uuid === uuid) {
          item.name = value
        } return item
      }))
    }
  }
  // useEffect(() => {
  //   viewTodo(view)
  // }, [view])

  // function viewTodo(view) {
  //   switch (view) {
  //     case "All":
  //       return Math.ceil(todos.length / 5)
  //     case "Done":
  //       return Math.ceil(todos.filter(item => item.done === true).length / 5)
  //     case "Undone":
  //       return Math.ceil(todos.filter(item => item.done === false).length / 5)

  //     default:
  //       break;
  //   }
  // }

  axios.interceptors.response.use((response) => {
    return response;
  },
    (error) => {
      if (error) {
        setErrMessage(error.response.data.errors || error.response.data.error);
        setIsError(true);
      }
      return Promise.reject(error);
    }
  );


  return (
    <div>
      <Box display='flex' justifyContent='center' m={1} p={10}>
        <h1>My ToDo List</h1>
      </Box>
      <Header addTodo={addNewTodo} />
      <Filter filters={filters} setView={setView} filtersForDate={filtersForDate} />
      <ListTodo
        todos={todos}
        deleteTodo={deleteTodo}
        doneTodo={doneTodo}
        stateCreatedAt={stateCreatedAt}
        page={page}
        view={view}
        changeTaskName={changeTaskName}
      />
      <Pagination todos={todos} handlerChange={handlerChange} countTodos={countTodos} />
      {isError ?
        (<Snackbar
          open={isError}
          onClose={() => setIsError(false)}
          autoHideDuration={2000}>
          <Alert
            severity="error"
            onClose={() => setIsError(false)} >
            {errMessage}
          </Alert>
        </Snackbar>
        ) : null}
    </div>
  )
}