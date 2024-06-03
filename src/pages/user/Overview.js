import { alpha, Avatar, Box, Button, Card, CardContent, Chip, Grid, TextField, IconButton, LinearProgress, Step, StepLabel, Stepper, Dialog, DialogActions, DialogContent, DialogTitle, Typography, Hidden } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useRef, useState } from 'react';
import PageHeader from './dashboard/PageHeader';
import Welcome from '../../assets/images/Credit_Card_3.png'
import { AccountBalanceWallet, Help, LocalMall, Visibility, VisibilityOff } from '@mui/icons-material';
import { getUserCard, resendEmailVerification } from '../../actions/actions';
import { connect } from 'react-redux'
import MasterCard from '../../assets/images/mastercard.svg'
import Modal from '../../components/Modal';
import Tour from 'reactour'


const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiChip-colorPrimary': {
      background: theme.primaryColorOrange
    },
    '& .MuiLinearProgress-colorPrimary': {
      background: '#fff'
    },
    '& .MuiLinearProgress-barColorPrimary': {
      background: theme.primaryColorOrange
    },
    '& .MuiStepLabel-label': {
      color: alpha('rgb(255,255,255)', 0.5),
    },
    '& .MuiStepLabel-active': {
      color: theme.primaryColorOrange
    },

  },
  banner: {
    background: theme.secondaryColorDark,
    borderRadius: '8px',
    padding: '2rem',
    marginBottom: '2rem'
  },
  bannerImage: {
    width: '100%'
  },
  bannerTitle: {
    color: '#fff',
    fontWeight: 600,
    fontSize: '1.8rem',
    marginTop: '1rem'
  },
  title: {
    fontWeight: 700,
    marginTop: '1rem',
    color: '#fff'
  },

  card: {
    background: '#18569a',
    padding: '1rem',
    borderRadius: '10px',
    height: '85%'
  },
  cardText: {
    color: alpha('rgb(255,255,255)', 0.5),
    '& span': {
      fontWeight: 600,
      color: '#fff'
    }
  },
  cardIcon: {
    background: theme.primaryColorOrange,
    marginBottom: '2rem'
  },
  stages: {
    padding: 0,
    background: 'none'
  },
  wrap: {
    width: '60%'
  },
  stage: {
    padding: 0,
    background: 'none',
    marginBottom: '.8rem'
  },
  helpCenter: {

  }
}))

const Overview = (props) => {
  const classes = useStyles()
  const { user, getUserCard } = props
  const [show, setShow] = useState(false)
  const [disable, setDisable] = useState(false)
  const [secure, setSecure] = React.useState(false)
  const [security, setSecurity] = React.useState({ ans: '', err: '' })
  const [open, setOpen] = useState(false)
  const accountRef = useRef()

  React.useEffect(() => {
    if (user.status === 'Approved') {
      getUserCard();
    }
  }, [getUserCard, user])

  const showCardNumber = () => {
    if (show) {
      setShow(false)
    } else {
      setSecure(true)
    }
  }
  const closeDialog = () => {
    setSecure(false)
    setSecurity({ ans: '', err: '' })
  }

  const securityCheck = (answer) => {
    if (answer.trim().toUpperCase() === props.currentUser.security) {
      closeDialog()
      setShow(true)
    } else {
      setSecurity((prev) => {
        return { ...prev, err: 'Wrong answer' }
      })
    }
  }

  const renderCardNumber = () => {
    if (props.card.number && show === false) {
      return props.card.number.replace(/\d(?=\d{4})/g, "*")
    }
    if (props.card.number && show === true) {
      return props.card.number
    }
    return '****-****-****-****'
  }

  const resendEmail = () => {
    setDisable(true)
    props.resendEmailVerification()
  }

  const renderPage = () => {
    if (props.user.emailStatus === 0) {
      return <>
        <Typography paragraph variant='body1' className={classes.cardText} style={{ marginTop: '.4rem' }}>
          Please check your email ({props.user.email}) to activate your account.
        </Typography>
        <Box>
          <LinearProgress style={{ height: '.5rem', borderRadius: '.5rem' }} variant='determinate' value={props.user.completion} />
          <Typography variant='body2' color='primary' style={{ marginTop: '.5rem' }}>{props.user.completion}% Complete.</Typography>
        </Box>

        <Button size='small' variant='contained' disabled={disable} style={{ marginTop: '.8rem' }} onClick={resendEmail} >Resend Email</Button>
      </>
    }
    if (props.user.emailStatus !== 0 && props.user.bankStatus === 0) {
      return <>
        <Typography paragraph variant='body1' className={classes.cardText} style={{ marginTop: '.4rem' }}>
          Please update your bank details to get approval for your WePay Card.
        </Typography>
        <Box>
          <LinearProgress style={{ height: '.5rem', borderRadius: '.5rem' }} variant='determinate' value={props.user.completion} />
          <Typography variant='body2' color='primary' style={{ marginTop: '.5rem' }}>{props.user.completion}% Complete.</Typography>
        </Box>

        <Button size='small' variant='contained' style={{ marginTop: '.8rem' }} href='/u/account/profile' >Update bank Details</Button>
      </>
    }
    if (props.user.emailStatus !== 0 && props.user.bankStatus !== 0 && props.user.fileStatus === 0) {
      return <>
        <Typography paragraph variant='body1' className={classes.cardText} style={{ marginTop: '.4rem' }}>
          Please upload your document to get approval for your WePay Card.
        </Typography>
        <Box>
          <LinearProgress style={{ height: '.5rem', borderRadius: '.5rem' }} variant='determinate' value={props.user.completion} />
          <Typography variant='body2' color='primary' style={{ marginTop: '.5rem' }}>{props.user.completion}% Complete.</Typography>
        </Box>

        <Button size='small' variant='contained' style={{ marginTop: '.8rem' }} href='/u/account/profile' >Upload Documents</Button>
      </>
    }
    if (props.user.status === 'Approved') {
      return <>
        <Typography variant='body1' className={classes.cardText} style={{ marginTop: '.4rem', marginBottom: '2rem' }}>
          Congratulations!! Your account has been approved successfully. Your account bears a credit limit of up to GH¢ {props.user.loan[0].limit.toLocaleString()}.
        </Typography>
        <Box>
          <Stepper alternativeLabel activeStep={props.user.status === 'Approved' && 3} className={classes.stage}>
            <Step > <StepLabel>Documents</StepLabel> </Step>
            <Step> <StepLabel>Verified</StepLabel> </Step>
            <Step> <StepLabel>Approved</StepLabel> </Step>
          </Stepper>
        </Box>
      </>

    }
    if (props.user.status === 'Verified') {
      return <>
        <Typography variant='body1' className={classes.cardText} style={{ marginTop: '.4rem', marginBottom: '2rem' }}>
          Congratulations!! Your account has been verified successfully. You have been approved a credit limit of GH¢ {props.user.loan[0].limit.toLocaleString()}.
        </Typography>
        <Box>
          <Stepper alternativeLabel activeStep={props.user.status === 'Verified' && 2} className={classes.stage}>
            <Step > <StepLabel>Documents</StepLabel> </Step>
            <Step> <StepLabel>Verified</StepLabel> </Step>
            <Step> <StepLabel>Approved</StepLabel> </Step>
          </Stepper>
        </Box>
      </>

    }

    return <>
      <Typography variant='body1' className={classes.cardText} style={{ marginTop: '.4rem', marginBottom: '2rem' }}>
        Congratulations!! Your account is currently under verification. We will prompt you when this process is done.
      </Typography>
      <Box>
        <Stepper alternativeLabel activeStep={props.user.status === 'Pending' && 1} className={classes.stage}>
          <Step > <StepLabel>Documents</StepLabel> </Step>
          <Step> <StepLabel>Verified</StepLabel> </Step>
          <Step> <StepLabel>Approved</StepLabel> </Step>
        </Stepper>
      </Box>
    </>


  }

  const steps = [
    {
      selector: `.jss26`,
      content: () => {
        return <>
          <Typography style={{ fontWeight: 500, fontSize: '1.2rem' }} gutterBottom>Activate your account</Typography>
          <Typography color='textSecondary'>
            Please check your email/inbox ({props.user.email}) to activate your account.
          </Typography>
        </>
      }
    },
    {
      selector: `.jss56`,
      content: () => {
        return <>
          <Typography style={{ fontWeight: 500, fontSize: '1.2rem' }} gutterBottom>Provide Bank Details</Typography>
          <Typography color='textSecondary' gutterBottom>
            Fill in your bank details to complete your account status, get verified and approved for a loan.
          </Typography>
          <Button variant='contained' color='secondary' href='/u/account/profile'>Bank Details</Button>
        </>
      }
    },
    {
      selector: `.jss56`,
      content: () => {
        return <>
          <Typography style={{ fontWeight: 500, fontSize: '1.2rem' }} gutterBottom>Upload Documents</Typography>
          <Typography color='textSecondary' gutterBottom>
            Upload your documents in the same account section to complete your account status, get verified and approved for a loan.
          </Typography>
          <Button variant='contained' color='secondary' href='/u/account/profile'>Upload Documents</Button>
        </>
      }
    },
    {
      selector: `.MuiButton-disableElevation`,
      content: () => {
        return <>
          <Typography style={{ fontWeight: 500, fontSize: '1.2rem' }} gutterBottom>Request For A Loan</Typography>
          <Typography color='textSecondary' gutterBottom>
            Become eligible after account verification to apply for a loan. Your credit limit will also be provided upon verification
          </Typography>
        </>
      }
    },
    {
      selector: `.jss32`,
      content: () => {
        return <>
          <Typography style={{ fontWeight: 500, fontSize: '1.2rem' }} gutterBottom>Need Help?</Typography>
          <Typography color='textSecondary' gutterBottom>
            I'm not far. Find me here at the bottom corner of your dashboard when you need a guide and I will be there to help.
          </Typography>
          <Button variant='contained' color='secondary' onClick={() => setOpen(false)}>Get Started</Button>
        </>
      }
    }
  ]

  const tourGuide = () => {
    setOpen(true)
  }

  return (
    <div className={classes.root}>
      <PageHeader title={'Overview'} link2={'dashboard'} user={props.user} tourGuide={tourGuide} />
      {props.modal && <Modal status={props.modal.status} />}

      {/* TOUR GUIDE */}
      <IconButton className={classes.helpCenter} style={{ background: '#24324d', zIndex: 99, position: 'fixed', bottom: '5%', right: '2.5%' }} onClick={() => setOpen(true)}><Help style={{ fontSize: '2.5rem', color: '#fff' }} /></IconButton>
      <Tour steps={steps} showCloseButton={false} isOpen={open} closeWithMask={false} onRequestClose={() => setOpen(false)} />

      <Grid container spacing={3} className={classes.banner} >
        <Hidden mdDown>
          <Grid item lg={2} sm={12}>
            <img src={Welcome} className={classes.bannerImage} alt='welcome-icon' />
          </Grid>
        </Hidden>
        <Grid item lg={10} sm={12}>
          <Chip size='medium' color='primary' label={props.user.status} />
          <Typography variant='h5' gutterBottom className={classes.bannerTitle}>Hello {props.user.fullname} </Typography>
          <Typography variant='body1' style={{ color: '#fff', marginBottom: '1.5rem' }}>Let's get started. Complete the following steps to get your WePay Card.<br /> Also complete your profile to raise your credit</Typography>

        </Grid>

      </Grid>

      <Grid container spacing={4}>

        <Grid item lg={4} sm={12} xs={12}>
          <Card className={classes.card} elevation={0}>
            <CardContent>
              <Typography variant='h6' innerRef={accountRef} style={{ color: '#fff' }}>Account Status</Typography>
              {renderPage()}
            </CardContent>
          </Card>
        </Grid>

        <Grid item lg={4} md={6} sm={12} xs={12}>
          <Card className={classes.card} elevation={0}>
            <CardContent>
              <Avatar className={classes.cardIcon} variant='rounded'><AccountBalanceWallet /> </Avatar>
              <Typography variant='h4' gutterBottom className={classes.title}>GH¢ {props.card.amount ? props.card.amount.toLocaleString() : '0.00'}</Typography>
              <Typography variant='h6' className={classes.cardText}>
                {renderCardNumber()}
                {props.card.number && <IconButton onClick={showCardNumber}> {show ? <Visibility fontSize='small' style={{ color: 'lightgrey' }} /> : <VisibilityOff fontSize='small' style={{ color: 'lightgrey' }} />} </IconButton>}
              </Typography>
              {props.card.number ?
                <Grid container>
                  <Grid item sm={8}>
                    <Typography variant='h6' className={classes.cardText}>{props.user.fullname.toUpperCase()}</Typography>
                    <Typography variant='body2' className={classes.cardText}>Expiry: {`${props.card.expiry.month}/${props.card.expiry.year}`}</Typography>
                  </Grid>
                  <Grid item sm={4} style={{ display: 'flex', flexDirection: 'row-reverse', justifyItems: 'flex-end' }}>
                    <img src={MasterCard} alt='visa' width={'40%'} />
                  </Grid>
                </Grid>
                : <Typography paragraph variant='body2' className={classes.cardText}>Available Card Balance</Typography>
              }

            </CardContent>
          </Card>
        </Grid>

        <Grid item lg={4} md={6} sm={12} xs={12}>
          <Card className={classes.card} elevation={0}>
            <CardContent style={{ position: 'relative' }}>
              <Chip label={'Coming soon'} style={{ position: 'absolute', top: '10%', right: '5%' }} />
              <Avatar className={classes.cardIcon} variant='rounded'><LocalMall /> </Avatar>
              <Typography variant='h4' gutterBottom className={classes.title}>{`GH¢ ${0}.00`}</Typography>
              <Typography variant='h6' className={classes.cardText}>Savings / Susu</Typography>
              <Typography paragraph variant='body2' className={classes.cardText}>Contribution</Typography>

            </CardContent>
          </Card>
        </Grid>


      </Grid>

      {/* SECURITY CHECK */}

      <Dialog open={secure} >
        <DialogTitle>Security Question</DialogTitle>
        <DialogContent style={{ width: '30rem' }}>
          <TextField variant='outlined' error={security.err === '' ? false : true} value={security.ans} onChange={(e) => setSecurity({ ans: e.target.value, err: '' })} fullWidth label="Mother's Maiden Name" helperText={security.err} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => securityCheck(security.ans)}>Answer</Button>
          <Button onClick={closeDialog}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
};

const mapStateToProps = (state) => {
  //console.log(state)
  return state
}

export default connect(mapStateToProps, { getUserCard, resendEmailVerification })(Overview)
