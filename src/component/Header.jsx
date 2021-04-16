import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'

const useStylesHeader = makeStyles({
    root: {
        width: '50%'
    }
})

function Header({ addTodo, setErrMessage }) {
    const classesHeader = useStylesHeader()
    const [textValue, setTextValue] = useState('')

    return (
        <div>
            <Box display='flex' justifyContent='center' m={1} p={1}>
                <form className={classesHeader.root}
                    onSubmit={event => {
                        event.preventDefault();
                    }}>
                    <TextField fullWidth id="outlined-basic" label="To Do:" variant="outlined"
                        value={textValue}
                        onChange={event => setTextValue(event.target.value)}
                        onKeyDown={event => {
                            try {
                                if (event.key === 'Enter') {
                                    if (event.target.value.trim() === '') {
                                        throw new Error('Input your task!')
                                    } else {
                                        addTodo({ name: textValue, done: false })
                                        setTextValue("")
                                    }
                                }
                            }
                            catch (error) {
                                setErrMessage(error.message)
                            }
                        }
                        }
                    />
                </form>
            </Box>
        </div>
    )
}

export default Header