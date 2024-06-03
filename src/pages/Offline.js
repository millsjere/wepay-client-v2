import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import WIFI from '../assets/images/wifi.png'

const Offline = () => {

  return (
    <Box sx={{
        margin: '0 auto',
		width: {xs:'80%', sm: '80%', md: '50%', lg:'40%'},
		height: '100vh',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
        fontFamily: 'sans-serif',
        textAlign: 'center'
	}}>
        <img src={WIFI} alt='no-internet' style={{width: '40%', marginBottom: '1rem'}} />
        <Typography variant='body1' sx={{fontWeight: 300, fontSize: {xs: '1.2rem',sm: '1.6rem', md: '2rem'}}} mb={4}>Oops, you are currently offline. Please check your internet connection</Typography>
        <Button size='large' variant='contained' disableElevation color='secondary' onClick={()=> window.location.reload()}>Refresh Page</Button>
    </Box>
  )
}

export default Offline