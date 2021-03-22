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

function Item({todo, deleteTodo, checkedTodo, changeTaskText}) {
  const classesTextField = useStylesHeader()
  const [taskText, setTaskText] = useState(todo.text)

        return (
          <ListItem role={undefined} dense button>
            <ListItemIcon>
              <Checkbox
                edge="start"
                tabIndex={-1}
                disableRipple
                checked = {todo.checked}
                onChange = {() => {
                  checkedTodo(todo.id)             
                } }
              />
            </ListItemIcon>
              <TextField
              className = {classesTextField.root} 
              id="standard-basic" 
              value = {taskText} 
              onChange = {event => {setTaskText(event.target.value)}}
              />
            <p>{todo.date}</p>
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete" onClick = {() => deleteTodo(todo.id)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        );
      }

export default Item