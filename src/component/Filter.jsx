import React from 'react'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { IconButton } from '@material-ui/core';

const useStylesFilter = makeStyles({
    root: {
        width: '100%',
        height: '50px'
    }
}) 

function Filter ({sortByDate, setView }) {
    const classesFilter = useStylesFilter()
    return (
        <div className = {classesFilter.root}>
            <Box display = 'flex' justifyContent = 'space-between' m = {1} p = {1}>
                   <Box display = 'flex'>
                    <Box p = {1}>
                        <Button variant="contained" onClick={() => setView('All')}>All Tasks</Button>
                    </Box>
                    <Box p = {1}>
                        <Button variant="contained" color="primary" onClick={() => setView('Done')}>Done Tasks</Button>
                    </Box> 
                    <Box p = {1}>
                        <Button variant="contained" color="secondary" onClick={() => setView('Undone')}>Undone Tasks</Button>
                    </Box>
                    </Box>
                <Box display = 'inline-flex' alignItems = 'center' justifyContent = 'flex-end'>
                    <p>Sort by Date:</p>
                    <IconButton edge = 'end' aria-label = 'sortUp' onClick = {() => sortByDate(false)}>
                        <ArrowUpwardIcon />
                    </IconButton>
                    <IconButton  aria-label = 'sortDown' onClick = {() => sortByDate(true)} >
                        <ArrowDownwardIcon />
                    </IconButton>
                </Box>    
            </Box>    
        </div>
    )
}

export default Filter