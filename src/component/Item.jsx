import React, {useState} from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemIcon from '@material-ui/core/ListItemIcon'


function Item({todo, deleteTodo, checkedTodo}) {
  console.log(todo)

  const [checked, setChecked] = useState(false)
        return (
          <ListItem role={undefined} dense button>
            <ListItemIcon>
              <Checkbox
                edge="start"
                tabIndex={-1}
                disableRipple
                checked = {checked}
                onChange = {() => {
                  checkedTodo(todo.id)
                  setChecked(!checked)    
                  
                } }
              />
            </ListItemIcon>
            <ListItemText primary={todo.text} />
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