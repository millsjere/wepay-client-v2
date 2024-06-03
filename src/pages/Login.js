import { Box, Button, Container, Divider, Grid, Hidden, InputAdornment, Link, TextField, Typography } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import React, { useEffect, useReducer } from 'react';
import Google from  '../assets/images/google.svg'
import LoginImage from  '../assets/images/login.svg'
import Modal from '../components/Modal';
import { connect } from 'react-redux';
import { loginUser, successModal } from '../actions/actions';
import { useLocation } from 'react-router-dom';
import 'animate.css'



const useStyles = makeStyles(theme => ({
  root : {
    marginTop: '2rem',
    '& .MuiDivider-root': {
      flexGrow: 1
    }
  },
  wrapper : {
    [theme.breakpoints.up('lg')] : {
      margin : '0 0 4rem 6rem'
    },
    display: 'flex',
    flexDirection: 'column',
    padding: '3.2rem',
    borderRadius: '16px',
    boxShadow: '-24px 24px 72px 8px rgb(145 158 171 / 24%)',
    '& a': {
      color: theme.primaryColorOrange,
      fontWeight: 400
      
    }
  },
  image : {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title : {
    marginBottom: '.5rem',
    fontWeight: 500
  },
  field : {
    marginBottom: '1.5rem',
    borderRadius: '1.6rem',
    '& *': {
      borderRadius: '8px'
    },
    '& label.Mui-focused':{
      color: theme.primaryColorOrange
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        border: `1px solid ${theme.primaryColorOrange}`
      }
    }
  },
  btn: {
    background: theme.primaryColorOrange,
    padding: '1rem 0',
    color: '#fff',
    borderRadius: '8px',
    marginBottom: '2rem',
    '&:hover' : {
      background: theme.secondaryColorDark
    }
  },
  btnGoogle: {
    padding: '1rem 0',
    background: grey[300],
    borderRadius: '8px'
  },
  flex : {
    marginBottom: '2rem',
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    alignItems: 'center'
  },
  fieldIcon: {
    color: grey[400],
    cursor: 'pointer',
  },
  toolbarHeight: theme.mixins.toolbar,

}))



const Login = (props) => {
  const {currentUser, successModal} = props
  const classes = useStyles()
  const [show, setShow] = React.useState(false)
  const path= useLocation();
  const token = path.search.split('=')[1]
  //console.log(path)


  useEffect(()=>{
    if(currentUser === false && path.search !== ''){
      successModal('Activating your account. Please login to complete')
      return
    }
  },[currentUser, path, successModal])
  

  const reducerFn = (state, action) => {
    switch (action.type) {
      case "EMAIL":
        return {...state, email: action.payload.toUpperCase().trim()}
      case "PASSWORD":
        return {...state, password: action.payload.trim()}
      case "RESET":
        return { email: '', password : ''}    
      default:
        return state
    }
  }
  const [formInput, dispatch] = useReducer(reducerFn, { email: '', password : ''})

  const onFormSubmit = (e) => {
    e.preventDefault()
    //console.log(formInput)

    // call action creators
    if(path.search === ''){
      props.loginUser(formInput)
    }else{
      props.loginUser(formInput, token)
    }
  }

  

  return (
    <>
      <div className={classes.toolbarHeight} ></div>
      <Container className={classes.root}>

      {/* MODAL  */}
      { props.modal && <Modal status={props.modal.status} />}
        <Grid container spacing={5}>
          <Hidden smDown>
            <Grid item xs={12} sm={6} md={6} lg={6} className={`${classes.image} animate__animated animate__fadeIn`}>
              <img style={{width: '90%'}} src={LoginImage} alt='login-icon' />
            </Grid>
          </Hidden>

          <Grid item xs={12} sm={12} md={6} lg={6} style={{display: 'flex', justifyContent: 'center'}} className='animate__animated animate__zoomIn' >
            <div className={`${classes.wrapper}`}>
              <Typography className={classes.title} variant='h4'>Login</Typography>
              <Typography style={{marginBottom: '2.5rem'}} paragraph color='textSecondary'>Don't have an account? <Link href='/auth/register'>Create Account</Link></Typography>

              <form onSubmit={(e)=> onFormSubmit(e)}>
                <TextField className={classes.field} variant='outlined'  label='Email' helperText='' value={formInput.email} onChange={(e)=>dispatch({type: "EMAIL", payload: e.target.value})} fullWidth />
                <TextField className={classes.field} variant='outlined' label='Password' 
                  helperText='' fullWidth type={show ? 'text' : 'password'} value={formInput.password} onChange={(e)=>dispatch({type: "PASSWORD", payload: e.target.value})}
                  InputProps={{ endAdornment: <InputAdornment position='start'>{ show ? <Visibility onClick={()=>setShow(!show)} className={classes.fieldIcon} /> : <VisibilityOff onClick={()=>setShow(!show)} className={classes.fieldIcon} /> }</InputAdornment>}}
                  />
                <Typography paragraph > <Link href='/auth/forgotpassword' underline='always'>Forgot Password </Link> </Typography>
                <Button className={classes.btn} disableElevation type='submit' fullWidth>Login</Button>
              </form>

                <Box className={classes.flex} >
                  <Divider /> 
                  <Typography color='textSecondary' variant='body2' >or continue with</Typography> 
                  <Divider />
                </Box>
              <Button className={classes.btnGoogle} disableElevation fullWidth>
              <img style={{marginRight: '1rem'}} src={Google} alt='google_icon' /> Login with Google</Button>
            </div>
          </Grid>
        </Grid>
      </Container>
    </>

  ) 
};


 const mapStateToProps = (state) => {
   return state
 }

export default connect(mapStateToProps, {loginUser, successModal})(Login);