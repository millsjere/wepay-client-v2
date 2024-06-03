
import React, { useRef, useState } from 'react';
import { Button, Stack, Typography } from '@mui/material';
import { connect } from 'react-redux';
import { verifyUser } from '../../actions/actions';
import Slide from '../../assets/images/pay2.jpeg'
import AuthWrapper from './AuthWrapper';
import RoundButton from '../../components/RoundButton';


const Verify = (props) => {
  const [load, setLoad] = useState(false)

    // Verify Email Refs
    const ref1 = useRef()
    const ref2 = useRef()
    const ref3 = useRef()
    const ref4 = useRef()
    const ref5 = useRef()
    const ref6 = useRef()

  const resendSMS = async () => {
    setLoad(true)
    await props.resendCode()
    setLoad(false)
  }

  const onFormSubmit = async (e) => {
    e.preventDefault()
    const code = ref1.current?.value + ref2.current?.value + ref3.current?.value + ref4.current?.value + ref5.current?.value + ref6.current?.value
    if(code === '') return props?.errorModal('Invalid. Please provide activation code')
    if(code?.length < 6) return props?.errorModal('Invalid activation code. Please check your code')
    
    setLoad(true)
    await props.verifyUser({ code: code })
    setLoad(false)
  }

  // Auto focus Email token
  const autoFocusHandler = (event) => {
    const element = event.target;
    const nextSibling = element.nextElementSibling;
    nextSibling ? nextSibling.focus() : element.blur();
  };




  return (
    <>
    <AuthWrapper
        title={<Typography sx={{ fontWeight: 500, mb: .5 }} variant='h5'>Verify Your Account</Typography>}
        subtitle={<Typography sx={{ mb: 3 }} paragraph color='textSecondary'>Please check your phone ({props.currentUser?.phone}) to verify your account </Typography>}
        image={Slide} imagePosition={'center'}
        order={2}
      >
          <Stack direction={'row'} gap={'.6rem'} my={3} width={'100%'} mx={'auto'}>
            {
                new Array(6).fill(0).map((el, i) => {
                    return (
                        <input key={i} autoFocus={ i === 0 ? true : false}
                            ref={ i === 0 ? ref1 : i === 1 ? ref2 : i === 2 ? ref3 : i === 3 ? ref4 : i === 4 ? ref5 : ref6 } 
                            type='text' maxLength={1}
                            onChange={(e) =>autoFocusHandler(e)} 
                            style={{ textAlign: 'center', height: '4rem', fontSize: '2rem', width: '100%', borderRadius: '3px', border: '1px solid lightgrey' }} 
                        />
                    )
                })
            }
        </Stack>
        <Typography color='textSecondary' variant='body2' >Didn't get code? <Button variant='text' disableElevation
          onClick={resendSMS}>Resend code</Button></Typography>
        <RoundButton onClick={onFormSubmit} 
          loading={load} sx={{ mb: '1rem' }}
          text='Verify Account' variant={'contained'} 
          color='secondary' disableElevation type='submit' fullWidth 
        />
      </AuthWrapper>
    </>
  )
};

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps, { verifyUser })(Verify);
