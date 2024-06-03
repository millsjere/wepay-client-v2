import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';
import { Box, Button, Container, Divider, Grid, styled, TextField, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import LoginImage from '../../assets/images/login.svg'
import Modal from '../../components/Modal';
import { connect } from 'react-redux';
import { verifyUser, resendCode } from '../../actions/actions';
import { LoadingButton } from '@mui/lab';

const InputField = styled(TextField)(({ theme }) => ({
  textAlign: 'center',
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
}))

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
    textAlign: 'center',
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



const Verify = (props) => {
  const classes = useStyles()
  const [code, setCode] = useState('')
  const [load, setLoad] = useState(false)


  const resendSMS = async () => {
    setLoad(true)
    await props.resendCode()
    setLoad(false)
  }

  const onFormSubmit = async (e) => {
    e.preventDefault()
    if (code === '') return
    setLoad(true)
    await props.verifyUser({ code: code })
    setLoad(false)
  }


  return (
    <>
      <div className={classes.toolbarHeight}></div>
      <Container className={classes.root}>

        {/* MODAL  */}
        {props.modal && <Modal status={props.modal.status} />}
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6} className={classes.image}>
            <img style={{ width: '90%' }} src={LoginImage} alt='login-icon' />
          </Grid>
          <Grid item xs={12} sm={6} >
            <div className={`${classes.wrapper}`}>
              <Typography className={classes.title} variant='h4'>Verify It's You</Typography>
              <Typography style={{ marginBottom: '2.5rem' }} paragraph color='textSecondary'>Please check your phone ({props.currentUser && props.currentUser.phone}) to verify your account </Typography>

              <form >
                <InputField variant='outlined' label='Enter verification code' value={code} onChange={(e) => setCode(e.target.value)} fullWidth />
                <LoadingButton variant='contained' color='secondary' loading={load} sx={{
                  padding: '1rem 0',
                  borderRadius: '8px',
                  marginBottom: '2rem',
                }} disableElevation onClick={(e) => onFormSubmit(e)} fullWidth>Verify Code</LoadingButton>
              </form>

              <Box className={classes.flex} >
                <Divider />
                <Typography color='textSecondary' variant='body2' >Didn't get code? <Button variant='text' disableElevation
                  onClick={resendSMS}>Resend code</Button></Typography>
                <Divider />
              </Box>
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

export default connect(mapStateToProps, { verifyUser, resendCode })(Verify);
