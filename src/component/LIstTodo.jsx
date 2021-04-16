import React from 'react'
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles'
import Item from './Item'



const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    margin: 5
  },
}));


function ListTodo({ todos, deleteTodo, doneTodo, changeTaskName }) {
  const classesItem = useStyles()
  
  const filters = () => {
    return todos.map(todo =>
      <Item
        key={todo.uuid}
        todo={todo}
        deleteTodo={deleteTodo}
        doneTodo={doneTodo}
        changeTaskName={changeTaskName}
      />
    )
  }


  return (
    <List className={classesItem.root}>
      {filters()}
    </List>
  )
}


export default ListTodo
