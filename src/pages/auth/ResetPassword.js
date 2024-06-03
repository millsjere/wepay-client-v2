import { Container, Grid, InputAdornment, TextField, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { grey } from '@mui/material/colors';
import { makeStyles } from '@mui/styles';
import React, { useReducer, useState } from 'react';
import LoginImage from '../../assets/images/login.svg'
import Modal from '../../components/Modal';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { errorModal, resetPassword } from '../../actions/actions';
import 'animate.css'
import { LoadingButton } from '@mui/lab';



const useStyles = makeStyles(theme => ({
  root: {
    marginTop: '2rem',
    '& .MuiDivider-root': {
      flexGrow: 1
    }
  },
  wrapper: {
    [theme.breakpoints.up('sm')]: {
      margin: '0 0 4rem 6rem'
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
  image: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    marginBottom: '.5rem',
    fontWeight: 500
  },
  field: {
    marginBottom: '1.5rem',
    borderRadius: '1.6rem',
    '& *': {
      borderRadius: '8px'
    },
    '& label.Mui-focused': {
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
    '&:hover': {
      background: theme.secondaryColorDark
    }
  },
  btnGoogle: {
    padding: '1rem 0',
    background: grey[300],
    borderRadius: '8px'
  },
  flex: {
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



const ResetPassword = (props) => {
  const classes = useStyles()
  const token = useLocation().search.split('=')[1]
  const [confirm, setConfirm] = useState(false)
  const [load, setLoad] = useState(false)
  const [show, setShow] = useState(false)


  const reducerFn = (state, action) => {
    switch (action.type) {
      case "PASSWORD":
        return { ...state, password: action.payload }
      case "CONFIRM_PASSWORD":
        return { ...state, confirmPassword: action.payload }
      case "RESET":
        return { password: '', confirmPassword: '' }
      default:
        return state
    }
  }
  const [formInput, dispatch] = useReducer(reducerFn, { password: '', confirmPassword: '' })

  const onFormSubmit = async (e) => {
    e.preventDefault()

    // check passwords
    if (formInput.password.length < 6 || formInput.confirmPassword.length < 6) {
      props.errorModal('Invalid. Password must more than 6 characters');
      return
    }
    if (formInput.password !== formInput.confirmPassword) {
      props.errorModal('Invalid. Passwords do not match');
      return
    }

    setLoad(true)
    // call action creators
    await props.resetPassword(token, formInput)
    setLoad(false)
  }


  return (
    <>
      <div className={classes.toolbarHeight} ></div>
      <Container className={classes.root}>

        {/* MODAL  */}
        {props.modal && <Modal status={props.modal.status} />}
        <Grid container spacing={5}>

          <Grid item xs={12} sm={6} className={`${classes.image} animate__animated animate__fadeIn`}>
            <img style={{ width: '90%' }} src={LoginImage} alt='login-icon' />
          </Grid>

          <Grid item xs={12} sm={6} className='animate__animated animate__zoomIn' >
            <div className={`${classes.wrapper}`}>
              <Typography className={classes.title} mb={1} variant='h4'>Reset Password</Typography>
              <Typography style={{ marginBottom: '2.5rem' }} paragraph color='textSecondary'>Password must be more than 6 characters? </Typography>

              <form onSubmit={(e) => onFormSubmit(e)}>
                <TextField className={classes.field} variant='outlined' type={show ? 'text' : 'password'} label='New Password' InputProps={{
                  endAdornment: <InputAdornment position='start'>{show ? <Visibility onClick={() => setShow(!show)} className={classes.fieldIcon} /> : <VisibilityOff onClick={() => setShow(!show)} className={classes.fieldIcon} />}</InputAdornment>
                }} value={formInput.password} onChange={(e) => dispatch({ type: "PASSWORD", payload: e.target.value })} fullWidth />

                <TextField className={classes.field} variant='outlined' type={confirm ? 'text' : 'password'} label='Confirm Password' InputProps={{
                  endAdornment: <InputAdornment position='start'>{confirm ? <Visibility onClick={() => setConfirm(!confirm)} className={classes.fieldIcon} /> : <VisibilityOff onClick={() => setConfirm(!confirm)} className={classes.fieldIcon} />}</InputAdornment>
                }} value={formInput.confirmPassword} onChange={(e) => dispatch({ type: "CONFIRM_PASSWORD", payload: e.target.value })} fullWidth />

                <LoadingButton loading={load} className={classes.btn} disableElevation type='submit' fullWidth>Reset Password</LoadingButton>
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

export default connect(mapStateToProps, { errorModal, resetPassword })(ResetPassword)
