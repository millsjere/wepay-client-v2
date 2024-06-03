import { Box, Breadcrumbs, Button, Checkbox, Chip, Dialog, DialogActions, DialogContent, Divider, FormControlLabel, IconButton, InputAdornment, Link, makeStyles, MenuItem, TextField, Typography } from '@mui/material';
import { Close, Check } from '@mui/icons-material';
import React, { useEffect, useReducer, useState } from 'react';
import { connect } from 'react-redux';
import { getInterestRates, requestLoan, errorModal, popupSettings, welcomePopup } from '../../../actions/actions';
import Modal from '../../../components/Modal';
import Award from '../../../assets/images/award.gif'
import 'animate.css'


const useStyles = makeStyles(theme => ({
  crumbs: {
    fontSize: '13px'
  },
  page: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '50px'
  },
  active: {
    color: theme.backgroundPrimary
  },
  field: {
    marginTop: '1rem'
  }
}))


const PageHeader = ({ tourGuide, welcomePopup, popupSettings, errorModal, modal, title, link1, link2, currentUser, getInterestRates, interest, requestLoan }) => {
  const classes = useStyles()
  // const path = useLocation().pathname
  const [open, setOpen] = useState(false)
  const [accept, setAccept] = useState(false)
  const [pay, setPay] = useState(0)
  const [load, setLoad] = useState(true)

  useEffect(() => {
    getInterestRates()
  }, [getInterestRates])

  // const filterRates = (val) => {
  //   const getRate = interest.filter(el => el.duration === val);
  //   console.log(getRate)
  //   setRate(getRate[0].rate)
  // }

  const calcPayment = (loan, rate, dur) => {
    //Principal+(principal x interest x Rate)÷Duration
    if (loan === '' || rate === 0 || dur === '') {
      return
    }
    const interest = (loan * ((rate * dur) / 100))
    const total = interest + loan;
    const result = (total / dur)
    setPay(Math.round(result))
  }

  const initialState = {
    amount: '',
    duration: '',
  }

  const reducerFn = (state, action) => {
    switch (action.type) {
      case "LOAN":
        calcPayment(action.payload * 1, interest.rate, state.duration)
        return { ...state, amount: action.payload }
      case "DURATION":
        calcPayment(state.amount * 1, interest.rate, action.payload)
        return { ...state, duration: action.payload }
      case "RESET":
        return initialState
      default:
        return state;
    }
  }

  const [formInput, dispatch] = useReducer(reducerFn, initialState)

  const onHandleClose = () => {
    dispatch({ type: "RESET" })
    setAccept(false)
    setPay(0)
    setOpen(false)
  }

  const onPopUpClose = () => {
    popupSettings();
    window.location.assign('/u/account/payment');
  }

  const closeWelcomeScreen = () => {
    setLoad(false)
    welcomePopup()
    setTimeout(() => {
      tourGuide()
    }, 1000)
  }

  const getLoan = () => {
    if (currentUser.completion < 100) {
      errorModal('Please complete your Account Status to be eligible for a Loan. Thank you')
      return
    }
    if (currentUser.status === 'Pending') {
      errorModal('Sorry, your account must be verified to be eligible for a Loan.')
      return
    }
    if (currentUser.loan[0].amount) {
      errorModal(`Sorry, you have already requested for a loan. Please pay off to request another loan`)
      return
    }
    setOpen(true)
  }

  const onLoanRequest = () => {
    if (formInput.amount === '' || formInput.duration === '') {
      return
    }
    const data = {
      amount: formInput.amount * 1,
      duration: formInput.duration,
      interest: interest.rate,
      perMonth: parseInt(pay)
    }
    //console.log(data)
    requestLoan(data)
    dispatch({ type: "RESET" })
    setAccept(false)
    setPay(0)
    setOpen(false)
  }

  const checkLimit = (e) => {
    if (e.target.value > currentUser.loan[0].limit) {
      errorModal('Invalid. You have entered an amount beyound your approved credit limit')
      return
    }
    dispatch({ type: "LOAN", payload: e.target.value })
  }

  return (
    <div className={classes.page}>
      {modal && <Modal status={modal.status} />}
      <Box>
        <Typography variant='h5' gutterBottom> {title} </Typography>
        <Breadcrumbs>
          <Link className={classes.crumbs} color='inherit' href='/u/account/dashboard'> Overview </Link>
          {link1 ? <Link className={classes.crumbs} color='inherit' href={`/u/account/${link1.toLowerCase()}`} > {link1} </Link> : null}
          <Typography className={`${classes.crumbs} ${classes.active}`} color="textPrimary" > {link2} </Typography>
        </Breadcrumbs>

      </Box>

      {
        <Button variant='contained' color='secondary' style={{ height: '2.5rem' }} disableElevation onClick={getLoan} >Get a Loan</Button>
      }



      {/* POPUP */}
      <Dialog open={currentUser.completion === 100 && currentUser.status === 'Verified' && currentUser.popup[0].status === 'on'} >
        <DialogContent style={{ position: 'relative' }}>
          <IconButton style={{ position: 'absolute', top: '2%', right: '3%' }} onClick={() => popupSettings()}><Close /></IconButton>
          <Box textAlign={'center'}>
            <img src={Award} width='50%' alt='award' />
          </Box>
          <Box textAlign={'center'} marginBottom='2rem' padding='0 2rem'>
            <Typography variant='h6' style={{ fontWeight: 600, fontSize: '1.8rem' }}>You're All Set Now</Typography>
            <Typography color='textSecondary' paragraph variant='body1'>Congratulations!! Your account profile is complete. You are now eligible to request for a LOAN. You have been approve a credit limit of GH¢ {currentUser.loan.length === 0 ? '0.00' : currentUser.loan[0].limit.toLocaleString()}.</Typography>
            <Button size='large' variant='contained' disableElevation color='secondary' onClick={onPopUpClose}>GET A LOAN NOW</Button>
          </Box>
        </DialogContent>
      </Dialog>

      {/* POPUP */}
      <Dialog open={currentUser.popup[0].welcome === true && load}  >
        <DialogContent style={{ position: 'relative' }} >
          <Box textAlign={'center'}>
            <img src={Award} width='50%' alt='award' />
          </Box>
          <Box textAlign={'center'} marginBottom='2rem'>
            <Typography variant='h6' style={{ fontWeight: 600, fontSize: '1.8rem' }}>Welcome to WePayGh</Typography>
            <Typography color='textSecondary' paragraph variant='body1' style={{ padding: '0 1rem' }}>Congratulations!! Your account registration is successful. <br />Please complete the following stages to qualify for a LOAN. </Typography>
            <Box display='flex' gridGap={'.7rem'} justifyContent='center' marginBottom={'2rem'}>
              <Chip icon={<Check />} label='Activate Email' />
              <Chip icon={<Check />} label='Submit Bank Details' />
              <Chip icon={<Check />} label='Upload Documents' />
            </Box>
            <Button size='large' variant='contained' disableElevation color='secondary' onClick={closeWelcomeScreen}>Let's Get Started</Button>
          </Box>
        </DialogContent>
      </Dialog>


      {/* GET A LOAN */}
      <Dialog open={open}>
        <Box padding={' 1rem 2rem'}>
          <Typography variant='h6' style={{ fontWeight: 600, fontSize: '1.5rem' }}>Get a Loan</Typography>
          <Typography color='textSecondary' variant='body2'>Fill out the form below to request for a loan</Typography>
        </Box>
        <Divider />
        <DialogContent>
          <TextField type='number' value={formInput.amount} className={classes.field} fullWidth variant='outlined' inputProps={{ step: 100, max: currentUser.loan.length === 0 ? 0 : currentUser.loan[0].limit }} InputProps={{
            endAdornment: <InputAdornment position='end'><Button disabled disableElevation>Credit Limit(GH¢ {currentUser.loan.length === 0 ? '0.00' : currentUser.loan[0].limit.toLocaleString()})</Button> </InputAdornment>
          }} onChange={(e) => checkLimit(e)} label='Loan Amount' />

          <TextField className={classes.field} fullWidth select defaultValue={''} value={formInput.duration} onChange={(e) => dispatch({ type: "DURATION", payload: e.target.value })} label='Duration' variant='outlined'>
            {
              [3, 6, 9, 12, 24].map((el) => {
                return (
                  <MenuItem key={el} value={el}>
                    <Typography>{el} Months</Typography>
                  </MenuItem>
                )
              })
            }
          </TextField>

          <TextField className={classes.field} variant='outlined' InputProps={{
            endAdornment: <InputAdornment position='end'> <Button disabled disableElevation>Interest per Month</Button> </InputAdornment>
          }} fullWidth value={interest ? `${interest.rate}%` : 0} />

          <TextField className={classes.field} variant='outlined' InputProps={{
            startAdornment: <InputAdornment position='start'>GH¢</InputAdornment>,
            endAdornment: <InputAdornment position='end'> <Button disabled disableElevation>Pay per Month</Button> </InputAdornment>
          }} fullWidth value={pay.toLocaleString()} />

          <FormControlLabel style={{ marginTop: '.5rem' }} control={<Checkbox color='primary' checked={accept} onClick={() => setAccept(!accept)} />} label={<Typography variant='body2' color='textSecondary'>I hereby accept the Interest Rate and WePay Policy</Typography>} />
        </DialogContent>

        <DialogActions style={{ padding: '1rem 2rem' }}>
          <Button variant='outlined' onClick={onHandleClose}>Cancel</Button>
          <Button variant='contained' disabled={accept ? false : true} disableElevation color='secondary' onClick={onLoanRequest} style={{ color: '#fff' }}  >Request Loan</Button>
        </DialogActions>
      </Dialog>

    </div>
  )
};


const mapStateToProps = (state) => {
  //console.log(state)
  return state
}

export default connect(mapStateToProps, { getInterestRates, requestLoan, errorModal, popupSettings, welcomePopup })(PageHeader)
