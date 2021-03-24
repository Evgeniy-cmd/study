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


function ListTodo({todos, deleteTodo, doneTodo, stateCreatedAt, page, view, changeTaskName}){
    const classesItem = useStyles()
    const sortUp = (a, b) => {
      if(a.createdAt < b.createdAt) return 1
      else if(a.createdAt > b.createdAt) return -1
      else if(a.createdAt === b.createdAt) return 0
    }
    const sortDown = (a, b) => {
      if(a.createdAt > b.createdAt) return 1
      else if(a.createdAt < b.createdAt) return -1
      else if(a.createdAt === b.createdAt) return 0
     }

     const selectViewTodos = (todos) => {
      switch (view) {
        case "All":
          return todos;
        case "Done":
          return todos.filter(item => item.done);
        case "Undone":
          return todos.filter(item => !item.done);
        default:
          return [];
      }
    }

    const sortByCreatedAt = () =>{
      return selectViewTodos(todos.sort(stateCreatedAt ? sortUp : sortDown))
    } 



    const renderItem  = () =>{
        return sortByCreatedAt().filter((_,index)=> (index >= (page * 5))&&(index < (page * 5) + 5)).map(todo => 
        <Item 
        key = {todo.uuid} 
        todo = {todo} 
        deleteTodo={deleteTodo} 
        doneTodo={doneTodo} 
        changeTaskName = {changeTaskName}
        />)
    }
    
    

    return(
            <List className = {classesItem.root}>
                {renderItem()}
            </List>
    )
}


export default ListTodo
