import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'

const useStylesHeader = makeStyles({
    root: {
        width: '50%'
    }
})

function Header ({saveTodo}) {
    const classesHeader = useStylesHeader()
    const [value, setValue] = useState('')
    return (
        <div>
            <Box display ='flex' justifyContent = 'center' m = {1} p = {1}>
                <form  className = {classesHeader.root} 
                onSubmit = {event => 
                    {event.preventDefault(); 
                    saveTodo(value)}}>
                    <TextField fullWidth id="outlined-basic" label="To Do:" variant="outlined" 
                        onChange = {event => {setValue(event.target.value)}}
                        value = {value} />
                </form>
            </Box>    
         </div>   
    )
}

export default Header