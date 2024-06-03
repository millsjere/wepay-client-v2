import { Box, Button, Container, FormControlLabel, Grid, InputAdornment, Link, Switch, TextField, Typography, MenuItem, Checkbox, Hidden } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import React, { useReducer, useRef, useState } from 'react';
import LoginImage from  '../assets/images/login.svg'
import { connect } from 'react-redux';
import { registerUser, errorModal } from '../actions/actions';
import Modal from '../components/Modal';
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
    padding: '1rem 0',
    color: '#fff',
    borderRadius: '8px',
    marginBottom: '1rem',
    '&:hover' : {
      background: theme.secondaryColorDark
    }
  },
  btnBack: {
    background: theme.secondaryColorDark,
    padding: '1rem 0',
    color: '#fff',
    borderRadius: '8px',
    marginBottom: '1rem',
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
  upload:{
    padding: '1rem',
    textAlign: 'center',
    border: `1px solid ${grey[300]}`,
    borderRadius: '8px',
    marginBottom: '1.5rem',
    cursor: 'pointer',
    '&:hover' : {
      background: grey[100]
    }
  }

}))



const Register = (props) => {
  const classes = useStyles()
  const[toggle, setToggle] = useState(false)
  const [step, setStep] = useState(0)
  const [show, setShow] = useState(false)
  const [check, setCheck] = useState(false)
  const [id, setID] = useState('')

  const identity = ['Voters', 'Passport', 'License', 'Ghana Card']

  //file upload refs
  const ref1 = useRef()
  const ref2 = useRef()
  const ref3 = useRef()

  // initialState //
  const initialState = {
    fname: '', 
    lname: '', 
    other: '',
    email: '',
    phone: '',
    dob: '',
    password: '',
    address: '',
    occupation: '',
    company: '',
    companyAddress: '',
    bank: '',
    accNumber: '',
    bankBranch: '',
    monthlySalary: '',
    loan: '',
    security: '',
    nationalID: '',
    payslip: '',
    sdo: '',
    ghCard: ''
  }
  //reducer Function //
  const reducerFn = (state, action) => {
    switch (action.type) {
      case "FIRST_NAME":
        return {...state, fname: action.payload.toUpperCase()}
      case "LAST_NAME":
        return {...state, lname: action.payload.toUpperCase()}
      case "OTHER_NAME":
          return {...state, other: action.payload.toUpperCase()}
      case "EMAIL":
        return {...state, email: action.payload.toUpperCase()}
      case "PHONE":
        return {...state, phone: action.payload}
      case "DOB":
        return {...state, dob: action.payload}
      case "PASSWORD":
        return {...state, password: action.payload}
      case "ADDRESS":
        return {...state, address: action.payload.toUpperCase()}
      case "OCCUPATION":
          return {...state, occupation: action.payload.toUpperCase()}
      case "COMPANY":
          return {...state, company: action.payload.toUpperCase()}
      case "COMPANY_ADDRESS":
        return {...state, companyAddress: action.payload.toUpperCase()}
      case "MONTHLY_SALARY":
        return {...state, monthlySalary: action.payload}
      case "LOAN":
        return {...state, loan: action.payload}
      case "NATIONAL_ID":
        return {...state, nationalID: action.payload}
      case "PAYSLIP":
        return {...state, payslip: action.payload}
      case "SDO":
        return {...state, sdo: action.payload} 
      case "GHCARD":
        return {...state, ghCard: action.payload} 
      case "RESET":
        return initialState
      default:
        return state;
    }
  }
  const [formInput, dispatch] = useReducer(reducerFn, initialState)


  const stepBack = () => {
    setStep(prev => {
      return prev - 1
    })
  }

  const selectNationalID = (e) =>{
    setID(e.target.value)
  }

  const onFormSubmit = (e) => {
    e.preventDefault();
    if(step === 0) {
      // do checks //
      if(formInput.fname === '' || formInput.lname === ''|| formInput.email === '' || formInput.dob === '' || !formInput.email.includes('@') || formInput.phone === '' || formInput.phone.length < 9 || formInput.password === '') {
        props.errorModal('Please fill all required(*) fields')
        return
      }
      // move to next step
      setStep(1)
      console.log(formInput)
    }
    if(step === 1) {
      // do checks //
      if(formInput.address === '' || formInput.occupation === '' || formInput.company === '' || formInput.companyAddress === '' || formInput.monthlySalary === '' || formInput.requestAmount === '') {
        props.errorModal('Please fill all required(*) fields')
        return
      }
      //
      setStep(2)
      setShow(false)
      console.log(formInput)
    }
    if(step === 2) {
      
      // do checks
      if(formInput.nationalID === ''){
        props.errorModal('Please provide your National ID')
        return
      }
      // create formData
      const formData = new FormData();
      formData.append('fname', formInput.fname.trim())
      formData.append('lname', formInput.lname.trim())
      formData.append('other', formInput.other.trim())
      formData.append('email', formInput.email.trim())
      formData.append('phone', formInput.phone.trim())
      formData.append('dob', formInput.dob.trim())
      formData.append('password', formInput.password.trim())
      formData.append('address', formInput.address.trim())
      formData.append('occupation', formInput.occupation.trim())
      formData.append('company', formInput.company.trim())
      formData.append('companyAddress', formInput.companyAddress.trim())
      formData.append('monthlySalary', formInput.monthlySalary.trim())
      formData.append('IDNumber', formInput.nationalID.trim() )
      formData.append('IDType', id )

      if(!show){
        if(formInput.payslip === '' || formInput.sdo === '' || formInput.ghCard === ''){
          props.errorModal('Please attach a copy of Payslip, Standing Order & Ghana Card OR upload later')
          return
        }
        formData.append('document[]', formInput.payslip)
        formData.append('document[]', formInput.sdo)
        formData.append('document[]', formInput.ghCard)
      }


      // call action creator
      props.registerUser(formData)

      // reset form
     // dispatch({type: "RESET"}) 
    }
  }

  const uploadFiles = (e, type) => {
    console.log(e.target.files[0])
    if(e.target.files[0].size > 500000) {
      props.errorModal('Selected file is too large. Max file size: 500Kb  ')
      return
    }

    if(type === "PAYSLIP"){
      dispatch({type:"PAYSLIP", payload: e.target.files[0]})
      return
    }
    if(type === "SDO"){
      dispatch({type:"SDO", payload: e.target.files[0]})
      return
    }if(type === "GHCARD"){
      dispatch({type:"GHCARD", payload: e.target.files[0]})
      return
   }

  }

  return (
    <>
      {/* MODAL  */}
      { props.modal && <Modal status={props.modal.status} />}
      
      <div className={classes.toolbarHeight}></div>
      <Container className={classes.root}>

        <Grid container spacing={5}>
          <Hidden smDown>
            <Grid item xs={12} sm={6} md={6} lg={6} className={`${classes.image} animate__animated animate__fadeIn`}>
              <img style={{width: '90%'}} src={LoginImage} alt='login-icon' />
            </Grid>
          </Hidden>

          <Grid item xs={12} sm={12} md={6} lg={6} style={{display: 'flex', justifyContent: 'center'}} className={`animate__animated animate__zoomIn`}>
            <div className={`${classes.wrapper}`}>
              <Typography className={classes.title} variant='h4'>Register</Typography>
              <Typography style={{marginBottom: '2.5rem'}} paragraph color='textSecondary'>Already have an account? <Link href='/auth/login'>Login</Link></Typography>

              { step === 0 && 
              <form >
                  <TextField className={classes.field} variant='outlined' value={formInput.fname} onChange={(e)=> dispatch({type:"FIRST_NAME", payload: e.target.value})} required label='First Name' helperText='' fullWidth />
                  <TextField className={classes.field} variant='outlined' value={formInput.lname} onChange={(e)=> dispatch({type:"LAST_NAME", payload: e.target.value})} required label='Last Name' helperText='' fullWidth />
                  <TextField className={classes.field} variant='outlined' value={formInput.other} onChange={(e)=> dispatch({type:"OTHER_NAME", payload: e.target.value})} label='Middle Name' helperText='' fullWidth />
                  <TextField className={classes.field} variant='outlined' value={formInput.email} onChange={(e)=> dispatch({type:"EMAIL", payload: e.target.value})} required label='Email' helperText='' fullWidth />
                  <TextField className={classes.field} variant='outlined' value={formInput.phone} InputProps={{startAdornment: <InputAdornment position='start'>+233</InputAdornment>}}
                    onChange={(e)=> dispatch({type:"PHONE", payload: e.target.value})} required inputProps={{ maxLength: '10' }} label='Phone' helperText='' fullWidth />
                  <TextField className={classes.field} variant='outlined' value={formInput.dob} onChange={(e)=> dispatch({type:"DOB", payload: e.target.value})} required label='Date of Birth' type={'date'} fullWidth InputProps={{ startAdornment: <InputAdornment position='start'>DOB</InputAdornment>}} />
                  <TextField className={classes.field} variant='outlined' value={formInput.password} onChange={(e)=> dispatch({type:"PASSWORD", payload: e.target.value})} required label='Password' 
                  helperText='' fullWidth type={ toggle ? 'text' : 'password' }
                  InputProps={{ endAdornment: <InputAdornment position='end' onClick={()=>setToggle(!toggle)} > { toggle ? <Visibility className={classes.fieldIcon} /> : <VisibilityOff className={classes.fieldIcon}/> } </InputAdornment>}}
                  />
                
                  <Button className={classes.btn} color='primary' variant='contained' disableElevation onClick={(e)=>onFormSubmit(e)} fullWidth>Continue</Button>
              </form>
              }

              { step === 1 &&
              <form >
                  <TextField className={classes.field} autoComplete='off' value={formInput.address} onChange={(e)=> dispatch({type:"ADDRESS", payload: e.target.value})} required  variant='outlined' label='Res. Address' helperText='' fullWidth />
                  <TextField className={classes.field} variant='outlined' value={formInput.occupation} onChange={(e)=> dispatch({type:"OCCUPATION", payload: e.target.value})} required label='Occupation' helperText='' fullWidth />
                  <TextField className={classes.field} variant='outlined' value={formInput.company} onChange={(e)=> dispatch({type:"COMPANY", payload: e.target.value})} required label='Name of Company' helperText='' fullWidth />
                  <TextField className={classes.field} variant='outlined' value={formInput.companyAddress} onChange={(e)=> dispatch({type:"COMPANY_ADDRESS", payload: e.target.value})} required label="Company's Address" helperText='' fullWidth />
                  
                  <TextField className={classes.field} variant='outlined' value={formInput.monthlySalary} InputProps={{startAdornment: <InputAdornment position='start'>GH¢</InputAdornment>}}
                    onChange={(e)=> dispatch({type:"MONTHLY_SALARY", payload: e.target.value})} required type='number' inputProps={{min: 0}} label='Monthly Salary' helperText='' fullWidth />
                  
                  {/* <TextField className={classes.field} variant='outlined' value={formInput.loan} InputProps={{startAdornment: <InputAdornment position='start'>GH¢</InputAdornment>}}
                    onChange={(e)=> dispatch({type:"LOAN", payload: e.target.value})} required type='number' inputProps={{min: 0}} label='Requested Amount' helperText='' fullWidth 
                  /> */}
                 
                  <Box style={{display:'flex', gap:'1rem'}}>
                    <Button className={classes.btnBack} disableElevation onClick={stepBack} fullWidth>Back</Button>
                    <Button className={classes.btn} color='primary' variant='contained' disableElevation onClick={(e)=>onFormSubmit(e)} fullWidth>Continue</Button>
                  </Box>
              </form>

              }

              { step === 2 &&
                <form>
                  <input type='file' accept='.png, .jpg' style={{display: 'none'}} ref={ref1} onChange={(e)=> uploadFiles(e, "PAYSLIP")}/>
                  <input type='file' accept='.png, .jpg' style={{display: 'none'}} ref={ref2} onChange={(e)=> uploadFiles(e, "SDO")}/>
                  <input type='file' accept='.png, .jpg' style={{display: 'none'}} ref={ref3} onChange={(e)=> uploadFiles(e, "GHCARD")}/>

                  <TextField select label='National ID' variant='outlined' 
                    fullWidth helperText='' value={id} onChange={(e)=> selectNationalID(e)}
                    className={classes.field} >
                      { identity.map((option) => {
                          return(
                           <MenuItem key={option} value={option} >{option}</MenuItem>
                          )
                        })
                      }
                   </TextField>
                   { id === 'Voters' && <TextField className={classes.field} variant='outlined' label='Voters ID' fullWidth value={formInput.nationalID} onChange={(e)=> dispatch({type:"NATIONAL_ID", payload: e.target.value})} /> }
                   { id === 'Passport' && <TextField className={classes.field} variant='outlined' label='Passport No.' fullWidth value={formInput.nationalID} onChange={(e)=> dispatch({type:"NATIONAL_ID", payload: e.target.value})} /> }
                   { id === 'License' && <TextField className={classes.field} variant='outlined' label='Driver License' fullWidth value={formInput.nationalID} onChange={(e)=> dispatch({type:"NATIONAL_ID", payload: e.target.value})} /> }
                   { id === 'Ghana Card' && <TextField className={classes.field} variant='outlined' label='Ghana Card Number' helperText='' value={formInput.nationalID} onChange={(e)=> dispatch({type:"NATIONAL_ID", payload: e.target.value})} fullWidth /> }

                  <Box style={{display: show ? 'none' : 'block'}}>
                      <Box className={classes.upload} onClick={() => ref1.current.click()}>
                        <Typography color='textSecondary'>{ formInput.payslip === '' ? 'Upload PaySlip' : `Uploaded: ${formInput.payslip.name}`}</Typography>
                        <Typography variant='body2' color='textSecondary'>Max File Size: 0.5MB</Typography>
                      </Box>

                      <Box className={classes.upload} onClick={() => ref2.current.click()}>
                        <Typography color='textSecondary'>{ formInput.sdo === '' ? 'Upload Standing Order' : `Uploaded: ${formInput.sdo.name}`}</Typography>
                        <Typography variant='body2' color='textSecondary'>Max File Size: 0.5MB</Typography>
                      </Box>

                      <Box className={classes.upload} onClick={() => ref3.current.click()}>
                        <Typography color='textSecondary'>{ formInput.ghCard === '' ? 'Upload Ghana Card' : `Uploaded: ${formInput.ghCard.name}`}</Typography>
                        <Typography variant='body2' color='textSecondary'>Max File Size: 0.5MB</Typography>
                      </Box>
                  </Box>
                  <FormControlLabel label='Upload later' control={<Switch color="primary"/>}  style={{marginTop: '-1rem', marginBottom: '.5rem'}} onChange={()=> setShow(!show)} />
                  

                  <Box style={{display:'flex', gap:'1rem'}}>
                    <Button className={classes.btnBack} disableElevation onClick={stepBack} fullWidth>Back</Button>
                    <Button className={classes.btn} color='primary' variant='contained' disabled={check ? false : true } disableElevation onClick={(e)=>onFormSubmit(e)} fullWidth>Register</Button>
                  </Box>
                </form>
              }

                {/* 
                */}
                <FormControlLabel style={{textAlign: 'center'}} control={<Checkbox checked={check} onClick={()=> setCheck(!check)} />} label={<Typography  variant='body2' color='textSecondary' >I agree to <Link href='/policy'>Terms of Service and Privacy Policy</Link>.</Typography>} />
                
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

export default connect(mapStateToProps, {registerUser, errorModal})(Register);
