import { InputAdornment, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useReducer } from 'react';
import { connect } from 'react-redux';
import { forgortPassword } from '../../actions/actions';
import { useState } from 'react';
import Slide from '../../assets/images/pay4.jpeg'
import AuthWrapper from './AuthWrapper';
import { Link } from 'react-router-dom';
import { ArrowForward, Email } from '@mui/icons-material';
import RoundButton from '../../components/RoundButton';


const useStyles = makeStyles(theme => ({
  field: {
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
  }

}))



const ForgotPassword = (props) => {
  const classes = useStyles()
  const [load, setLoad] = useState(false)
  //const path = useLocation();


  const reducerFn = (state, action) => {
    switch (action.type) {
      case "EMAIL":
        return { ...state, email: action.payload }
      case "RESET":
        return { email: '', password: '' }
      default:
        return state
    }
  }
  const [formInput, dispatch] = useReducer(reducerFn, { email: '' })

  const onFormSubmit = async (e) => {
    e.preventDefault()
    setLoad(true)
    // call action creators
    await props.forgortPassword(formInput)
    setLoad(false)
  }



  return (
    <>
      <AuthWrapper
        title={<Typography sx={{ fontWeight: 500, mb: .5 }} variant='h5'>Forgot Password</Typography>}
        subtitle={<Typography sx={{ mb: 3 }} paragraph color='textSecondary'>Please enter your email to reset</Typography>}
        image={Slide} imagePosition={'center'}
        order={2}
      >
        <div>
          <form onSubmit={(e) => onFormSubmit(e)}>
            <TextField className={classes.field} variant='outlined' label='Email' helperText=''
              value={formInput.email}
              InputProps={{ endAdornment: <InputAdornment position='start'><Email fontSize='small' /></InputAdornment> }}
              onChange={(e) => dispatch({ type: "EMAIL", payload: e.target.value })} fullWidth
            />
            <RoundButton
              loading={load} sx={{ mt: '1rem' }}
              text='Reset Password' variant={'contained'} color='secondary'
              disableElevation type='submit' fullWidth />
          </form>
          <Typography textAlign={'center'} mt={4} display={'flex'} gap={.5} justifyContent={'center'} >Don't have an account? <Link to={'/signup'} style={{ color: '#f6a200', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '.2rem' }}>Sign up <ArrowForward fontSize='small' /></Link> </Typography>
        </div>
      </AuthWrapper>
    </>

  )
};


const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps, { forgortPassword })(ForgotPassword);
