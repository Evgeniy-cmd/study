import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert'

export default function AlertError({error}) {
  // const [open, setOpen] = useState(false);
  

  return (
     <Snackbar 
     open={true} 
     autoHideDuration={2000}>
        <Alert severity="error">
          {error}
        </Alert>
      </Snackbar>
  );
}