import React, {useState, useEffect} from 'react'
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

  useEffect(() =>{
    changeTaskName(taskName, todo.uuid)
  },[taskName])
  console.log(todo)
        return (
          <ListItem role={undefined} dense button>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked = {check}
                onChange = {(e) => {
                  doneTodo(todo.uuid)
                  setCheck(!check)             
                } }
              />
            </ListItemIcon>
              <TextField
              className = {classesTextField.root} 
              id="standard-basic" 
              value = {taskName} 
              onChange = {event => {setTaskName(event.target.value)}}
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