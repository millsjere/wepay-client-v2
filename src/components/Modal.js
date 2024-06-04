import React from 'react';
import { connect, useDispatch } from 'react-redux'
import { resetModal } from '../actions/actions';
import { Snackbar, Alert } from '@mui/material'
import Slide from '@mui/material/Slide';

function SlideTransition(props) {
  return <Slide {...props} direction="left" />;
}

const Modal = (props) => {
  const dispatch = useDispatch()
  const [open, setOpen] = React.useState(true);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    dispatch({ type: 'RESET_MODAL' })
  };

  return (
    <Snackbar open={open} autoHideDuration={3000} TransitionComponent={SlideTransition} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right', }}>
      <Alert variant='filled' elevation={1} severity={props.modal.status} onClose={handleClose}> {props.modal.message} </Alert>
    </Snackbar>
  )
};


const mapStateToProps = (state, myOwnProps) => {
  return { ...state, ...myOwnProps }
}

export default connect(mapStateToProps, { resetModal })(Modal);
