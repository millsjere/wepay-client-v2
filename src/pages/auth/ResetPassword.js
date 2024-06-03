import { InputAdornment, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { grey } from '@mui/material/colors';
import { makeStyles } from '@mui/styles';
import React, { useReducer, useState } from 'react';
import { connect } from 'react-redux';
import { errorModal, resetPassword } from '../../actions/actions';
import AuthWrapper from './AuthWrapper';
import Slide from '../../assets/images/pay.jpeg'
import InputField from '../../components/InputField';
import RoundButton from '../../components/RoundButton';


const useStyles = makeStyles((theme) => ({
  fieldIcon: {
    color: grey[400],
    cursor: 'pointer',
  },
}))



const ResetPassword = (props) => {
  const classes = useStyles()
  const [confirm, setConfirm] = useState(false)
  const [load, setLoad] = useState(false)
  const [show, setShow] = useState(false)


  const reducerFn = (state, action) => {
    switch (action.type) {
      case "TOKEN":
        return { ...state, token: action.payload }
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
  const [formInput, dispatch] = useReducer(reducerFn, { password: '', confirmPassword: '', token: '' })

  const onFormSubmit = async (e) => {
    e.preventDefault()

    // check passwords
    if (formInput.token === '' || formInput.token.length < 6) return props.errorModal('Invalid. Please provide reset token');
    if (formInput.password.length < 8 || formInput.confirmPassword.length < 8) return props.errorModal('Invalid. Password must more than 8 characters');
    if (formInput.password !== formInput.confirmPassword) return props.errorModal('Invalid. Passwords do not match');
    // api call
    setLoad(true)
    await props.resetPassword(formInput)
    setLoad(false)
  }


  return (
    <>
    <AuthWrapper
        title={<Typography sx={{ fontWeight: 500, mb: .5 }} variant='h5'>Reset Password</Typography>}
        subtitle={<Typography sx={{ mb: 3 }} paragraph color='textSecondary'>Password must be more than 8 characters</Typography>}
        image={Slide} imagePosition={'center'}
        order={2}
      >
        <form>
          <InputField
              type={'text'}
              variant='outlined'
              value={formInput?.token}
              onChange={(e) => dispatch({ type: "TOKEN", payload: e.target.value })}
              isRequired={true}
              label={'Reset Token'}
              fullWidth
            />
          <InputField variant='outlined' type={ show ? 'text' : 'password'}
              inputProps={{ maxLength: 10 }} 
              autoComplete={'false'} label='New Password'
              InputProps={{ 
                endAdornment: <InputAdornment position='start'>{ 
                  show ? <Visibility onClick={() => setShow(!show)} className={classes.fieldIcon} /> 
                  : <VisibilityOff onClick={() => setShow(!show)} className={classes.fieldIcon} />}
                  </InputAdornment>
                }}
              value={formInput.password} 
              onChange={(e) => dispatch({ type: "PASSWORD", payload: e.target.value })} 
              fullWidth 
          />
          <InputField variant='outlined' type={ confirm ? 'text' : 'password'}
              inputProps={{ maxLength: 10 }} 
              autoComplete={'false'} label='Confirm Password'
              InputProps={{
                  endAdornment: <InputAdornment position='start'>{ 
                    confirm ? <Visibility onClick={() => setConfirm(!confirm)} className={classes.fieldIcon} /> 
                    : <VisibilityOff onClick={() => setConfirm(!confirm)} className={classes.fieldIcon} />}
                    </InputAdornment>
                }} 
              value={formInput.confirmPassword} 
              onChange={(e) => dispatch({ type: "CONFIRM_PASSWORD", payload: e.target.value })} 
              fullWidth 
          />
            <RoundButton onClick={onFormSubmit} 
              loading={load} sx={{ mb: '1rem' }} 
              text='Reset' variant={'contained'} 
              color='secondary' disableElevation type='submit' fullWidth 
            />
        </form>
      </AuthWrapper>
    </>

  )
};


const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps, { errorModal, resetPassword })(ResetPassword)
