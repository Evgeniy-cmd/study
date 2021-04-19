import React, { useState, useEffect } from 'react'
import Header from './component/Header'
import Filter from './component/Filter'
import Box from '@material-ui/core/Box'
import ListTodo from './component/LIstTodo'
import Pagination from './component/Pagination'
import { deleteTask, getTask, newTask, doneTask } from './tasksAPI'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import { HashRouter as Router, Switch, Route, useHistory } from 'react-router-dom'
import SignIn from './component/SignIn'
import SignUp from './component/SignUp'
import Button from '@material-ui/core/Button'
import { tokenControl } from './token'


const querystring = require('querystring')

export default function App() {
  const [todos, setTodos] = useState([])
  const [page, setPage] = useState(0)
  const [errMessage, setErrMessage] = useState('')
  const [countTodos, setCountTodos] = useState(0)
  const [check, setCheck] = useState('')
  const [filterDate, setFilterDate] = useState('asc')


  let history = useHistory()

  useEffect(() => {
    async function getAllTask() {
      try {
        const response = await getTask(querystring.stringify({
          page: page,
          order: 'asc'
        }))
        if (response.status === 200) {
          setTodos(response.data.rows)
          setCountTodos(Math.ceil(response.data.count / 5))
        }
      } catch (e) {
        console.log(e)
      }
    }
    getAllTask()
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
      setErrMessage('Task already exist')
    }
  }


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
    setCountTodos(Math.ceil(response.data.count / 5))
  }

  async function filtersForDate(valueDate) {
    history = { history }
    setFilterDate(valueDate)
    const response = await getTask(querystring.stringify({
      page: page,
      order: valueDate,
      done: check
    }))
    setTodos(response.data.rows)
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
      setErrMessage('Task already exist')
    }
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setErrMessage(errMessage > 0)
  }

  return (
    <Route
    //  exact path='/' 
    // render={() => {
    //   return(
    //     (localStorage.getItem('token') !== null) ? history.push('/app') : history.push('/auth')
    //   )
    // }}
    >
      <Switch>
        <Route path='/reg' component={SignUp}>
          <SignUp />
        </Route>

        <Route exact path="/" component={SignIn}>
          <SignIn />
        </Route>

      <Route path='/app' component={App}>
        <div>
          <Box display='flex' justifyContent='flex-end' margin={4}>
            <Button variant="contained" color="primary"
              onClick={() => {
                localStorage.removeItem('token')
                history.push('/')
              }
              }>
              Log Out
        </Button>
          </Box>
          <Box display='flex' justifyContent='center' m={1} p={10}>
            <h1>My ToDo List</h1>
          </Box>
          <Header
            addTodo={addNewTodo}
            setErrMessage={setErrMessage} />
          <Filter
            filters={filters}
            filtersForDate={filtersForDate} />
          <ListTodo
            todos={todos}
            deleteTodo={deleteTodo}
            doneTodo={doneTodo}
            changeTaskName={changeTaskName}
          />
          <Pagination
            handlerChange={handlerChange}
            countTodos={countTodos} />
          <Snackbar
            open={errMessage.length > 0}
            autoHideDuration={2000}
            onClose={handleClose}>
            <Alert
              severity="error"
              onClose={handleClose}>
              {errMessage}
            </Alert>
          </Snackbar>
        </div>
      </Route>
      </Switch>
    </Route >
  )
}