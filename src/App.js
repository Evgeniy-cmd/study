import React from 'react'
import Header from './component/Header'
import Filter from './component/Filter'
import Item from './component/Item'
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles'

const useStyleApp = makeStyles({
  root: {
    // background: '#aa4b6b',
    // background: 'linear-gradient(to left, #3b8d99, #6b6b83, #aa4b6b)'
  }
})

function App() {
  const classesApp = useStyleApp()
  const saveTodo = (value) => {
    console.log(value)
  }
  return (
    <div className = {classesApp.root}>
      <Box display= 'flex' justifyContent = 'center' m = {1}>
        <h1>My ToDo List</h1>
      </Box>
        <Header saveTodo = {saveTodo} />
        <Filter />
        <Item />
    </div>    
        
  );
}

export default App;
