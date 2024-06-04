import { InputAdornment, styled, TextField, Typography } from '@mui/material';
import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { loginUser, successModal } from '../../actions/actions';
import { Link, useNavigate } from 'react-router-dom';
import RoundButton from '../../components/RoundButton';
import { ArrowForward, Call } from '@mui/icons-material';
import AuthWrapper from './AuthWrapper';
import Slide from '../../assets/images/slider1.jpg'
import { saveData } from '../../config/appConfig';
import base from '../../config/apis';

const InputField = styled(TextField)(({ theme }) => ({
  marginBottom: '1.5rem',
  '& *': {
    borderRadius: '8px'
  },
  '& label.Mui-focused': {
    color: theme.primaryColorOrange
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: '10px',
    "&.Mui-focused fieldset": {
      border: `1px solid ${theme.primaryColorOrange}`
    }
  }
}))


const Login = (props) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [load, setLoad] = React.useState(false)
  const [error, setError] = React.useState(false)
  const [phone, setPhone] = React.useState('')

  // console.log(getData('uid'))


  const onFormSubmit = async () => {
    if (phone === '' || phone.length < 10) {
      setError(true)
      dispatch({ type: 'ERROR', payload: 'Invalid. Phone number must be 10 characters' })
      return
    }
    // call action creators
    try {
      setLoad(true)
      const url = '/auth/login'
      const { data: res } = await base.post(url, { phone })
      if (res?.status === 'success') {
        // console.log(res?.data)
        saveData('uac', res?.data?.ac)
        saveData('uid', res?.data?.user)
        saveData('exp', res?.expiry)
        dispatch({ type: 'SUCCESS', payload: 'User Login successful' })
        setLoad(false)
        navigate('/verify', { replace: true })
      }
    } catch (error) {
      console.log(error?.response)
      dispatch({ type: 'ERROR', payload: error?.response?.data?.message })
    } finally {
      setLoad(false)
    }
  }


  return (
    <>
      <AuthWrapper
        title={<Typography sx={{ fontWeight: 500, mb: .5 }} variant='h5'>Welcome Back</Typography>}
        subtitle={<Typography sx={{ mb: 3 }} paragraph color='textSecondary'>Please enter your details to login</Typography>}
        image={Slide}
        order={1} 
        imagePosition={'right'}
      >
        <div>
          <InputField variant='outlined' error={error}
            inputProps={{ maxLength: 10 }} autoComplete={'false'} label='Phone Number'
            InputProps={{ endAdornment: <InputAdornment position='start'><Call fontSize='small' /></InputAdornment> }}
            placeholder='024********' value={phone} onChange={(e) => setPhone(e.target.value)} fullWidth />
          <RoundButton onClick={onFormSubmit} loading={load} sx={{ mb: '1rem' }} text='Login' variant={'contained'} color='secondary' disableElevation type='submit' fullWidth />
          <Typography textAlign={'center'} paragraph > <Link to='/forgot-password' styled={{ color: '#3f5176' }}>Forgot Password </Link> </Typography>
          <Typography textAlign={'center'} mt={4} display={'flex'} gap={.5} justifyContent={'center'} >Don't have an account? <Link to={'/signup'} style={{ color: '#f6a200', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '.2rem' }}>Sign up <ArrowForward fontSize='small' /></Link> </Typography>

        </div>
      </AuthWrapper>
    </>

  )
};


const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps, { loginUser, successModal })(Login);
