import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'

const useStylesHeader = makeStyles({
    root: {
        width: '50%'
    }
})

function Header ({addTodo}) {
    const classesHeader = useStylesHeader()
    const [value, setValue] = useState('')
    const [idNum, setIdNum] = useState(1)
    
    return (
        <div>
            <Box display ='flex' justifyContent = 'center' m = {1} p = {1}>
                <form  className = {classesHeader.root} 
                onSubmit = {event => 
                    {event.preventDefault(); 
                    }}>
                    <TextField fullWidth id="outlined-basic" label="To Do:" variant="outlined" 
                        onChange = {event => {setValue(event.target.value)}}
                        value = {value}
                        onKeyDown = {event => {
                            if(event.key === 'Enter'){
                                if (event.target.value.trim() === ''){
                                    alert('Input your task!')
                                } else {
                                    addTodo({name: value, done: false})
                                    setIdNum (idNum + 1) 
                                    setValue('')
                                        }}
                                    }} />
                </form>
            </Box>    
         </div>   
    )
}

export default Header