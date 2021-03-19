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


function ListTodo({todos, deleteTodo, checkedTodo, stateDate}){
    const classesItem = useStyles()
    
    const sortUp = (a, b) => {
      if(a.date < b.date) return 1
      else if(a.date > b.date) return -1
      else if(a.date === b.date) return 0
    }
    const sortDown = (a, b) => {
      if(a.date > b.date) return 1
      else if(a.date < b.date) return -1
      else if(a.date === b.date) return 0
     }
    const sortByDate = () =>{
      return todos.sort(stateDate ? sortUp : sortDown)
    } 

    const renderItem  = () =>{
        
        return sortByDate().map(todo => <Item key = {todo.id} todo = {todo} deleteTodo={deleteTodo} checkedTodo={checkedTodo}/>)
    }

    return(
            <List className = {classesItem.root}>
                {
                     renderItem()
                }
            </List>
    )
}


export default ListTodo
