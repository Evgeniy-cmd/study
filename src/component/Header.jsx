import React from 'react'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'

const useStylesHeader = makeStyles({
    root: {
        width: '50%'
    }
})

function Header(props) {
    const classesHeader = useStylesHeader()
    // const [value, setValue] = useState('')
    return (
        <div>
            <Box display='flex' justifyContent='center' m={1} p={1}>
                <form className={classesHeader.root}
                    onSubmit={event => {
                        event.preventDefault();
                    }}>
                    <TextField fullWidth id="outlined-basic" label="To Do:" variant="outlined"
                        onChange={ props.handlerValueText }
                        //  setValue(event.target.value) }

                        // value={value}
                        onKeyPress={ props.handlerValueText }
                    //     if (event.key === 'Enter') {
                    //         if (event.target.value.trim() === '') {
                    //             alert('Input your task!')
                    //         }
                    //         else {
                    //             addTodo({ name: value, done: false })
                    //             setValue('')
                    //         }
                    //     }
                    // }
                    />
                </form>
            </Box>
        </div>
    )
}

export default Header