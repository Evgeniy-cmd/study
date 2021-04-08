import React, {useState} from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Checkbox from '@material-ui/core/Checkbox'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'

const useStylesHeader = makeStyles({
  root: {
      width: '450px'
  }
})

function Item({todo, deleteTodo, doneTodo, changeTaskName}) {
  const classesTextField = useStylesHeader()
  const [taskName, setTaskName] = useState(todo.name)
  const [check, setCheck] = useState(todo.done)

  // const changeHandler = (event) => {
  //   // console.log(event)
  //   // if(event.key === 'Enter') { 
  //   //   console.log(event.key)
  //   // changeTaskName(taskName)
  //   // }
  //   //  else {
  //   setTaskName(event.target.value)
  //   // } 
  // }
      
        return (
          <ListItem role={undefined} dense button>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked = {check}
                onChange = {(event) => {
                  doneTodo(todo.uuid)
                  setCheck(!check)             
                } }
              />
            </ListItemIcon>
              <TextField
              className = {classesTextField.root} 
              id="standard-basic" 
              value = {taskName} 
              onChange = {(event) => setTaskName(event.target.value)}
              onKeyDown ={(event) => {
                if(event.key === 'Enter') { 
                  changeTaskName(taskName)
                  } 
              }}
              />
            <p>{todo.createdAt}</p>
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete" onClick = {() => deleteTodo(todo.uuid)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        );
      }

export default Item