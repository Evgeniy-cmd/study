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
                                addTodo({text: value, id: idNum, date: new Date().toLocaleString(), checked: false})
                                setIdNum (idNum + 1) 
                                setValue('')
                            }
                        }} />
                </form>
            </Box>    
         </div>   
    )
}

export default Header