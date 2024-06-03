import { Button, Container, Grid, Hidden, Link, TextField, Typography } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/styles';
import React, { useReducer } from 'react';
import LoginImage from  '../assets/images/login.svg'
import Modal from '../components/Modal';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { forgortPassword } from '../actions/actions';
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



const ForgotPassword = (props) => {
  const classes = useStyles()
  const path= useLocation();
  

  const reducerFn = (state, action) => {
    switch (action.type) {
      case "EMAIL":
        return {...state, email: action.payload}
      case "RESET":
        return { email: '', password : ''}    
      default:
        return state
    }
  }
  const [formInput, dispatch] = useReducer(reducerFn, { email: '' })

  const onFormSubmit = (e) => {
    e.preventDefault()
    console.log(formInput)

    // call action creators
    props.forgortPassword(formInput)
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
              <Typography className={classes.title} variant='h4'>Forgot Password</Typography>
              <Typography style={{marginBottom: '2.5rem'}} paragraph color='textSecondary'>Didn't forget your password? <Link href='/auth/login'>Login</Link></Typography>

              <form onSubmit={(e)=> onFormSubmit(e)}>
                <TextField className={classes.field} variant='outlined'  label='Email' helperText='' value={formInput.email} onChange={(e)=>dispatch({type: "EMAIL", payload: e.target.value})} fullWidth />
                
                <Button className={classes.btn} disableElevation type='submit' fullWidth>Reset Password</Button>
              </form>
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

export default connect(mapStateToProps, {forgortPassword})(ForgotPassword);
