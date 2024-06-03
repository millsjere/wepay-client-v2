import { Box, InputAdornment, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useReducer } from 'react';
import { connect } from 'react-redux';
import { forgortPassword } from '../../actions/actions';
import { useState } from 'react';
import Slide from '../../assets/images/pay4.jpeg'
import AuthWrapper from './AuthWrapper';
import { Link } from 'react-router-dom';
import { AlternateEmail, ArrowForward, Call, EmailOutlined, SendToMobileOutlined } from '@mui/icons-material';
import RoundButton from '../../components/RoundButton';
import InputField from '../../components/InputField';


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

const SwitchMethod = ({title, subtitle, onClick, icon}) => {
  return (
    <Box p={3} borderRadius={'10px'} textAlign={'left'} mb={2} border={ '1px solid lightgrey'} onClick={onClick}
      sx={{cursor: 'pointer', transition: 'all .2s ease-in', '&:hover': { border: `1px solid orange`}}}>
        {icon}
        <Typography variant='h6' fontSize={'1rem'}>{title}</Typography>
        <Typography variant='body2' color={'GrayText'}>{subtitle}</Typography>
    </Box>
  )
}



const ForgotPassword = (props) => {
  const classes = useStyles()
  const [load, setLoad] = useState(false)
  const [active, setActive] = useState('sms')
  const [step, setStep] = useState(0)


  const reducerFn = (state, action) => {
    switch (action.type) {
      case "EMAIL":
        return { ...state, email: action.payload }
      case "SMS":
        return { ...state, phone: action?.payload }
      default:
        return state
    }
  }
  const [formInput, dispatch] = useReducer(reducerFn, { email: '', phone: '' })

  const onFormSubmit = async (e) => {
    e.preventDefault()
    // validate 
    if(active === 'sms' && (formInput?.phone === '' || formInput?.phone?.length < 10)) return props?.errorModal('Invalid. Please provide the valid number')
    if(active === 'email' && (formInput?.email === '' || !formInput?.email?.include('@'))) return props?.errorModal('Invalid. Please provide the valid email address')
    setLoad(true)
    // call action creators
    await props.forgortPassword(formInput)
    setLoad(false)
  }


  return (
    <>
      <AuthWrapper
        title={<Typography sx={{ fontWeight: 500, mb: .5 }} variant='h5'>Forgot Password</Typography>}
        subtitle={<Typography sx={{ mb: 3 }} paragraph color='textSecondary'>Select a method to reset your password</Typography>}
        image={Slide} imagePosition={'center'}
        order={2}
      >
        <div>
          {
            step === 0 && 
            <>
              <SwitchMethod
                title={'Reset via SMS'}
                subtitle={'You will receive a verification token via SMS, enabling you to set a new password'}
                onClick={()=>{ setActive('sms'); setStep(1) }}
                icon={<SendToMobileOutlined fontSize='small' color='primary' />}
              />
              <SwitchMethod
                title={'Reset via Email'}
                subtitle={'You will be provided a unique token sent to your registered email address'}
                onClick={()=>{setActive('email'); setStep(1) }}
                icon={<EmailOutlined fontSize='small' color='primary' />}
              />
            </>
          }
          {
            step === 1 && 
            <>
              <form onSubmit={(e) => onFormSubmit(e)}>
              {
                active === 'sms' ? 
                <InputField className={classes.field} variant='outlined' label='Phone Number' helperText=''
                  value={formInput.phone} inputProps={{ maxLength: 10 }} 
                  InputProps={{ endAdornment: <InputAdornment position='start'><Call fontSize='small' /></InputAdornment> }}
                  onChange={(e) => dispatch({ type: "SMS", payload: e.target.value })} fullWidth
                />
                :
                <InputField className={classes.field} variant='outlined' label='Email' helperText=''
                  value={formInput.email}
                  InputProps={{ endAdornment: <InputAdornment position='start'><AlternateEmail fontSize='small' /></InputAdornment> }}
                  onChange={(e) => dispatch({ type: "EMAIL", payload: e.target.value })} fullWidth
                />
              }
                <RoundButton
                  loading={load} sx={{ mt: '.5rem' }}
                  text='Reset Password' variant={'contained'} color='secondary'
                  disableElevation type='submit' fullWidth />
              </form>
              <Typography textAlign={'center'} mt={4} display={'flex'} gap={.5} justifyContent={'center'} >Don't have an account? <Link to={'/signup'} style={{ color: '#f6a200', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '.2rem' }}>Sign up <ArrowForward fontSize='small' /></Link> </Typography>
            </>
          }
        </div>
      </AuthWrapper>
    </>

  )
};


const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps, { forgortPassword })(ForgotPassword);
