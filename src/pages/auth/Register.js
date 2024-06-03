import { Typography, MenuItem, Stack, InputAdornment, FormControlLabel, Checkbox } from '@mui/material';
import { ArrowForward, Visibility, VisibilityOff } from '@mui/icons-material';
import React, { useReducer, useState } from 'react';
import { connect } from 'react-redux';
import { registerUser, errorModal } from '../../actions/actions';
import { Link, useNavigate } from 'react-router-dom';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import AuthWrapper from './AuthWrapper';
import Slide from '../../assets/images/pay3.jpeg'
import InputField from '../../components/InputField';
import RoundButton from '../../components/RoundButton';



const Register = (props) => {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [toggle, setToggle] = useState(false)
  const [terms, setTerms] = useState(false)
  const [load, setLoad] = useState(false)

  // fields
  const personal = [
    { type: 'text', label: 'Surname', action: 'LAST_NAME', value: 'lname' },
    { type: 'text', label: 'Other Names', action: 'OTHER_NAMES', value: 'other' },
    { type: 'email', label: 'Email', action: 'EMAIL', value: 'email' },
    { type: 'tel', label: 'Phone', action: 'PHONE', value: 'phone' },
    { type: 'select', label: 'Gender', action: 'SEX', value: 'sex' }
  ]
  const extra = [
    { type: 'date', label: 'Date of Birth', action: 'DOB', value: 'dob' },
    { type: 'text', label: 'Residence', action: 'ADDRESS', value: 'address' },
    { type: 'text', label: 'Digital Address', action: 'DIGITAL_ADDRESS', value: 'digital_address' },
    { type: 'text', label: 'National ID', action: 'NATIONAL_ID', value: 'nationalID' },
    { type: 'date', label: 'ID Expiry', action: 'ID_EXPIRY', value: 'id_expiry_date' },
    { type: 'date', label: 'ID Issue', action: 'ID_ISSUED', value: 'id_issue_date' }
  ];
  const company = [
    { type: 'text', label: 'Occupation', action: 'OCCUPATION', value: 'occupation' },
    { type: 'text', label: 'Company Name', action: 'COMPANY', value: 'company' },
    { type: 'text', label: 'Company Address', action: 'COMPANY_ADDRESS', value: 'companyAddress' },
    { type: 'number', min: 0, label: 'Monthly Salary', action: 'SALARY', value: 'monthlySalary' },
  ];

  const password = [
    { type: 'password', label: 'Password', action: 'PASSWORD', value: 'password' },
    { type: 'password', label: 'Confirm Password', action: 'CONFIRM_PASSWORD', value: 'confirmPassword' },
  ];

  // initialState //
  const initialState = {
    lname: '',
    other: '',
    email: '',
    phone: '',
    dob: '',
    password: '',
    confirmPassword: '',
    address: '',
    digital_address: '',
    sex: '',
    occupation: '',
    company: '',
    companyAddress: '',
    monthlySalary: '',
    nationalID: '',
    id_expiry_date: '',
    id_issue_date: ''
  }
  //reducer Function //
  const reducerFn = (state, action) => {
    switch (action.type) {
      case "LAST_NAME":
        return { ...state, lname: action.payload.toUpperCase() }
      case "OTHER_NAMES":
        return { ...state, other: action.payload.toUpperCase() }
      case "EMAIL":
        return { ...state, email: action.payload.toUpperCase() }
      case "PHONE":
        return { ...state, phone: action.payload }
      case "DOB":
        return { ...state, dob: action.payload }
      case "PASSWORD":
        return { ...state, password: action.payload }
      case "CONFIRM_PASSWORD":
        return { ...state, confirmPassword: action.payload }
      case "ADDRESS":
        return { ...state, address: action.payload.toUpperCase() }
      case "DIGITAL_ADDRESS":
        return { ...state, digital_address: action.payload.toUpperCase() }
      case "SEX":
        return { ...state, sex: action.payload.toUpperCase() }
      case "OCCUPATION":
        return { ...state, occupation: action.payload.toUpperCase() }
      case "COMPANY":
        return { ...state, company: action.payload.toUpperCase() }
      case "COMPANY_ADDRESS":
        return { ...state, companyAddress: action.payload.toUpperCase() }
      case "SALARY":
        return { ...state, monthlySalary: action.payload }
      case "NATIONAL_ID":
        return { ...state, nationalID: action.payload.toUpperCase() }
      case "EXPIRY_DATE":
        return { ...state, id_expiry_date: action.payload }
      case "ISSUED_DATE":
        return { ...state, id_issue_date: action.payload.toUpperCase() }
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

  const stepForward = () => setStep(prev => prev + 1)

  const onFormSubmit = async () => {
    // do checks //
    if (step === 0) {
      if (formInput.fname === '' || formInput.lname === '') return props.errorModal('Please provide firstname and lastname')
      if (formInput.email === '' || !formInput.email.includes('@')) return props.errorModal('Please provide valid email address')
      if (formInput.phone === '' || formInput.phone.length < 9) return props.errorModal('Please provide a valid phone number')
      if (formInput.sex === '') return props.errorModal('Please select a gender')
      stepForward()
    }
    if (step === 1) {
      if (formInput.dob === '') return props.errorModal('Please provide a valid date of birth')
      if (formInput.address === '') return props.errorModal('Please provide a residence address')
      if (formInput.digital_address === '') return props.errorModal('Please provide digital address')
      if (formInput.nationalID === '' || formInput.nationalID.length > 15 || !formInput.nationalID.includes('-')) return props.errorModal('Please provide a valid ID')
      if (formInput.id_expiry_date === '') return props.errorModal('Please provide ID expiry date')
      if (formInput.id_issue_date === '') return props.errorModal('Please provide ID issue date')
      stepForward()
    }
    if (step === 2) {
      if (formInput.occupation === '') return props.errorModal('Please provide occupation')
      if (formInput.company === '') return props.errorModal('Please provide company name')
      if (formInput.companyAddress === '') return props.errorModal('Please provide company address')
      if (formInput.monthlySalary === 0) return props.errorModal('Please provide monthly salary')
      stepForward()
    }
    if (step === 3) {
      if (formInput.password === '' || formInput.password.length < 7) return props.errorModal('Invalid password must be more than 6 characters')
      if (formInput.password !== formInput.confirmPassword) return props.errorModal('Invalid passwords do not match')
      if (!terms) return props.errorModal('Please agree to the terms and conditions')
      setLoad(true)
      const status = await props.registerUser(formInput)
      if (status === 'success') {
        dispatch({ type: "RESET" })
        setLoad(false)
        navigate('/dashboard')
      } else {
        setLoad(false)
      }
    }

  }


  return (
    <>
      <AuthWrapper
        title={<Typography sx={{ fontWeight: 500, mb: .5 }} variant='h5'>Create Account</Typography>}
        subtitle={<Typography sx={{ mb: 3 }} paragraph color='textSecondary'>Please enter your details to create account</Typography>}
        image={Slide} imagePosition={'center'}
        order={2}
      >

        {step === 0 &&
          <div >
            {
              personal?.map((field, i) => (
                field?.type === 'select' ?
                  <InputField key={i}
                    type={field?.type}
                    variant='outlined'
                    value={formInput?.[field?.value]}
                    onChange={(e) => dispatch({ type: field?.action, payload: e.target.value })}
                    isRequired={true}
                    label={field?.label}

                    fullWidth isSelect={true}
                  >
                    <MenuItem value='MALE' >Male</MenuItem>
                    <MenuItem value='FEMALE' >Female</MenuItem>
                  </InputField>
                  :
                  <InputField key={i}
                    type={field?.type}
                    variant='outlined'
                    value={formInput?.[field?.value]}
                    onChange={(e) => dispatch({ type: field?.action, payload: e.target.value })}
                    isRequired={true}
                    label={field?.label}
                    fullWidth
                  />
              ))
            }
          </div>
        }
        {step === 1 &&
          <>
            {
              extra?.map((el, i) => (
                el?.type === 'date' ?
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker sx={{ mb: 2, width: '100%' }}
                      views={['year', 'month', 'day']}
                      label={el?.label}
                      value={formInput?.[el?.value]}
                      onChange={(newValue) => dispatch({ type: el?.action, payload: newValue })}
                      renderInput={(params) => {
                        return <InputField
                          isRequired={true} sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: '10px',
                              "&.Mui-focused fieldset": {
                                border: `1px solid orange`
                              }
                            }
                          }} fullWidth {...params} />
                      }}
                    />
                  </LocalizationProvider>
                  :
                  <InputField key={i}
                    type={el?.type}
                    variant='outlined'
                    value={formInput?.[el?.value]}
                    onChange={(e) => dispatch({ type: el?.action, payload: e.target.value })}
                    isRequired={true}
                    label={el?.label}

                    fullWidth

                  />
              )
              )
            }
          </>
        }
        {step === 2 &&
          <>
            {
              company?.map((field, i) => (
                <InputField key={i}
                  type={field?.type}
                  variant='outlined'
                  value={formInput?.[field?.value]}
                  onChange={(e) => dispatch({ type: field?.action, payload: e.target.value })}
                  isRequired={true}
                  label={field?.label}
                  helperText=''
                  inputProps={{ min: field?.min ? field?.min : null }}
                  fullWidth
                />
              ))
            }
          </>
        }
        {step === 3 &&
          <div>
            {
              password?.map((field, i) => (
                <InputField key={i}
                  type={field?.type}
                  variant='outlined'
                  value={formInput?.[field?.value]}
                  onChange={(e) => dispatch({ type: field?.action, payload: e.target.value })}
                  isRequired={true}
                  label={field?.label}
                  helperText=''
                  fullWidth
                  InputProps={{ endAdornment: <InputAdornment position='end' onClick={() => setToggle(!toggle)} > {toggle ? <Visibility sx={{ cursor: 'pointer' }} fontSize='small' /> : <VisibilityOff sx={{ cursor: 'pointer' }} fontSize='small' />} </InputAdornment> }}
                />
              ))
            }
            <FormControlLabel sx={{ width: '100%', mb: 2, mt: -1 }} onChange={() => setTerms(!terms)}
              control={<Checkbox size='small' checked={terms} />}
              label={<Typography variant='body2'>I agree to the Terms & Conditions</Typography>}
            />
          </div>
        }
        <Stack direction={'row'} gap={2}>
          {step > 0 && <RoundButton onClick={stepBack}
            loading={load} sx={{ mb: 1 }}
            text='Back' variant={'outlined'}
            color='secondary' disableElevation
            fullWidth />}
          <RoundButton onClick={onFormSubmit}
            loading={load} sx={{ mb: 1 }} disable={(step === 3 && !terms)}
            text={step === 3 ? 'Register' : 'Continue'} variant={'contained'}
            color='secondary' disableElevation
            fullWidth />
        </Stack>
        <Typography textAlign={'center'} mt={2} display={'flex'} gap={.5} justifyContent={'center'} >Already have an account? <Link to={'/login'} style={{ color: '#f6a200', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '.2rem' }}>Login <ArrowForward fontSize='small' /></Link> </Typography>
      </AuthWrapper>
    </>

  )
};

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps, { registerUser, errorModal })(Register);
