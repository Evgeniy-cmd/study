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
    return (
        <div>
            <Box display='flex' justifyContent='center' m={1} p={1}>
                <form className={classesHeader.root}
                    onSubmit={event => {
                        event.preventDefault();
                    }}>
                    <TextField fullWidth id="outlined-basic" label="To Do:" variant="outlined"
                        onChange={ props.handlerValueText }
                        onKeyPress={ props.handlerValueText }
                    />
                </form>
            </Box>
        </div>
    )
}

export default Header