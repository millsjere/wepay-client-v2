import { Box, Button, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import EPG from '../assets/images/404-error.png'


const useStyles = makeStyles(theme => ({
	wrap : {
		width: '100%',
		height: '100vh',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	},
	img: {
		[theme.breakpoints.down('sm')]: {
			width: '70%'
		}
	}
}))
function Errorpage() {
	const classes = useStyles()
	return (
		<>
			<Box className={classes.wrap}>
				<img src={EPG} alt='404' className={classes.img} />
				<Typography variant='h4' sx={{fontWeight: 300, fontSize: {xs: '2rem',sm: '2.5rem', md: '3rem'}}} mb={4}>Oops, page not found</Typography>
				<Button size='large' variant='contained' disableElevation color='secondary' href='/'>Go To WEPAYGH.COM</Button>
			</Box>
		</>
	);
}

export default Errorpage;
