import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
}));


export default function PaginationRounded({todos, handlerChange, countTodos}) {
  const classes = useStyles();

    
    
  return (
    <div className={classes.root}>
        <Box display = 'flex' justifyContent = 'center'>
            <Pagination count = {countTodos} variant="outlined" shape="rounded" onChange = {(handlerChange)}  />
        </Box> 
    </div>
  );
}

