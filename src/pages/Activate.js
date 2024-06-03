import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { activateAccount } from '../actions/actions'
import Modal from '../components/Modal'
import { connect } from 'react-redux'
import { successModal } from '../actions/actions'
import { Box, CircularProgress, Container, Typography } from '@material-ui/core'

const Activate = (props) => {
  const { activateAccount, currentUser } = props
  const path = useLocation()
  const token = path.search.split('=')[1]


  useEffect(()=>{
    if(path.search === undefined){
      window.location.assign('/');
      return
    }
    if(currentUser === false && path.search !== undefined){
        window.location.assign(`/auth/login?return=${token}`)
    }else{
      activateAccount(token)
    }
  },[currentUser, activateAccount, path, token])

  return (
    <>
      {/* MODAL  */}
      { props.modal && <Modal status={props.modal.status} />}

      <Container>
          <Box padding={'3rem'} textAlign='center' height='50vh' display={'flex'} flexDirection='column' justifyContent={'center'} alignItems='center'>
            <Typography variant='h6' gutterBottom>Activating your account...</Typography>
            <CircularProgress size={'24'} />
          </Box>
      </Container>

    </>
  )
}

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps, {activateAccount, successModal})(Activate);