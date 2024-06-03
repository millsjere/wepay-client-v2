import React from 'react';
import { connect } from 'react-redux'
import { resetModal } from '../actions/actions';
import { Snackbar, Alert } from '@mui/material'

const Modal = (props) => {
  //console.log(props)
  const [open, setOpen] = React.useState(true);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    props.resetModal()
  };

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center', }}>
      <Alert variant='filled' elevation={1} severity={props.modal.status} onClose={handleClose}> {props.modal.message} </Alert>
    </Snackbar>
  )
};


const mapStateToProps = (state, myOwnProps) => {
  return { ...state, ...myOwnProps }
}

export default connect(mapStateToProps, { resetModal })(Modal);
