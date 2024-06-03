import { Autocomplete, Box, Card, CardContent, CardHeader, Chip, Dialog, Divider, Grid, InputAdornment, LinearProgress, styled, TextField, Typography } from '@mui/material';
import React, { useReducer } from 'react';
import PageHeader from './dashboard/PageHeader'
import { CheckCircle, Schedule, Visibility } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { useState } from 'react';
import { useRef } from 'react';
import { uploadGhCard, uploadPayslip, updateDetails, uploadSDO, errorModal, successModal } from '../../actions/actions';
import { connect, useSelector, useDispatch } from 'react-redux';
import UploadFile from '../../assets/images/file-upload.png';
import PDF from '../../assets/images/pdf.png'
import { grey } from '@mui/material/colors';
import Modal from '../../components/Modal';
import {useNavigate} from 'react-router-dom'


const InputField = styled(TextField)(({theme}) => ({
    marginBottom: '1.5rem',
    '& label.Mui-focused':{
      color: theme.primaryColorOrange
    },
    "& .MuiOutlinedInput-root": {
      borderRadius: '10px',
    "&.Mui-focused fieldset": {
      border: `1px solid ${theme.primaryColorOrange}`
    }
  }
}))

const StyledCard = styled(Card)(({theme}) => ({
    borderRadius: '15px',
    '&:hover': {
        boxShadow: 'rgb(32 40 45 / 8%) 0px 2px 14px 0px'
    }
}))

const Documents = (props) => {
    const currentUser = useSelector(state => state.currentUser)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const ref1 = useRef()
    const ref2 = useRef()
    const ref3 = useRef()
    const [load, setLoad] = useState(false)
    const [loader, setLoader] = useState(false)
    const [other, setOther] = useState()

    const allBanks = [
        'Absa Bank Ghana Limited',
        'Access Bank Ghana Plc',
        'Agricultural Development Bank of Ghana',
        'Bank of Africa Ghana Limited',
        'CalBank Limited',
        'Consolidated Bank Ghana Limited',
        'Ecobank (Ghana) Limited',
        'FBN Bank Ghana Limited',
        'Fidelity Bank Ghana Limited',
        'First Atlantic Bank Limited',
        'First National Bank Ghana',
        'GCB Bank Limited',
        'Guaranty Trust Bank Ghana Limited',
        'National Investment Bank Limited',
        'OmniBSIC Bank Ghana Limited',
        'Prudential Bank',
        'Republic Bank Ghana Limited',
        'Société Générale Ghana Limited',
        'Stanbic Bank Ghana Limited',
        'Standard Chartered Bank Ghana Limited',
        'United Bank for Africa Ghana Limited',
        'Universal Merchant Bank Limited',
        'Zenith Bank (Ghana) Limited',
        'Service Integraty Savings and Loan',
        'Other'
    ]


      const uploadGH = async(e) => {
        if(currentUser.emailStatus === 0){
            props.errorModal('Sorry, please verify your email address to proceed')
            return
        }if(currentUser.bankStatus === 0){
            props.errorModal('Sorry, please provide your bank details')
            return
        }
        const file = e.target?.files[0]
        // if(file?.type !== 'image/png' || file?.type !== 'image/jpg' || file?.type !== 'image/jpeg'){
        //     props.errorModal('Invalid file type. Please select png, jpg, jpeg files only')
        //     return
        // }
        if(file.size > 1000000){
            props.errorModal('Invalid. File size is too large. Max size is 1MB')
            return
        }
        else{
            const data = new FormData()
            data.append('ghcard', e.target.files[0])
            setLoader(true)
            await props.uploadGhCard(data)
            setLoader(false)
            if(currentUser.payStatus === 0){
                setTimeout(() => {
                    dispatch(successModal(`Please upload your PaySlip`))
                }, 1000);
            }else{
                setTimeout(() => {
                    window.location.assign('/u/account/dashboard')
                }, 1000);
            }
        }
      }

      const uploadPS = async(e) => {
        if(currentUser.emailStatus === 0){
            props.errorModal('Sorry, please verify your email address to proceed')
            return
        }if(currentUser.bankStatus === 0){
            props.errorModal('Sorry, please provide your bank details')
            return
        }
        const file = e.target?.files[0]
        // console.log(file?.type)
        if(file?.size > 5000000){
            props.errorModal('Invalid. File size is too large. Max size is 5MB')
            return
        }
        if(file?.type === 'image/png' || file?.type === 'image/jpg' || file?.type === 'image/jpeg' || file?.type === 'application/pdf'){
            const data = new FormData()
            data.append('payslip', e.target.files[0])
            setLoader(true)
            await props.uploadPayslip(data)
            setLoader(false)
            if(currentUser.ghcardStatus === 0){
                setTimeout(() => {
                    dispatch(successModal(`Please upload your Ghana Card`))
                }, 1000);
            }else{
                setTimeout(() => {
                    window.location.assign('/u/account/dashboard')
                }, 1000);
            }
        }else{
            props.errorModal('Invalid file type. Please select png, jpg, jpeg, pdf files only')
            return
        }
      }

      const uploadSD = async(e) => {
        if(currentUser.emailStatus === 0){
            props.errorModal('Sorry, please verify your email address to proceed')
            return
        }if(currentUser.bankStatus === 0){
            props.errorModal('Sorry, please provide your bank details')
            return
        }
        const file = e.target?.files[0]
        if(file?.size > 5000000){
            props.errorModal('Invalid. File size is too large. Max size is 5MB')
            return
        }
        if(file?.type === 'image/png' || file?.type === 'image/jpg' || file?.type === 'image/jpeg' || file?.type === 'application/pdf'){
            const data = new FormData()
            data.append('sdo', e.target.files[0])
            setLoader(true)
            await props.uploadSDO(data)
            setLoader(false)
            if(currentUser.ghcardStatus === 0){
                setTimeout(() => {
                    dispatch(successModal(`Please upload your Ghana Card`))
                }, 1000);
            }else{
                setTimeout(() => {
                    window.location.assign('/u/account/dashboard')
                }, 1000);
            }
        }
        else{
            props.errorModal('Invalid file type. Please select png, jpg, jpeg, pdf files only')
            return
        }
      }

      const bankReducerFn = (state, action) => {
        switch (action.type) {
          case "BANK":
            return {...state, bank: action.payload}
          case "ACC_NUMBER":
            return {...state, accNumber: action.payload} 
          case "BRANCH":
            return {...state, bankBranch: action.payload}    
          case "MANAGER":
            return {...state, bankManager: action.payload}    
          case "SECURITY":
              return {...state, security: action.payload}   
          case "RESET": 
            return {bank: '', accNumber: '', bankBranch: '', security: ''}
          default:
            return state;
        }
      }

      const [bankInput, dispatchBank] = useReducer(bankReducerFn, {bank: '', accNumber: '', bankBranch: '',bankManager: '', security: ''})

      const onFormSubmit = async() => {
        
        // console.log(bankInput)
        if(currentUser.emailStatus === 0){
            props.errorModal('Sorry, please verify your email address to proceed')
            return
        }
        if(bankInput.bank === '' || bankInput.accNumber === '' ||  bankInput.bankBranch === '' || bankInput.security === ''){
            // console.log(bankInput)
            props.errorModal('Please fill all required(*) fields')
            return
        }
        if(other){
            bankInput.bank = other;
        }
        setLoad(true)
        await props.updateDetails(bankInput, 'Bank')
        setLoad(false)
      }



  return (
      <>
          <PageHeader title={'Documents'} link2={'Documents'} user={props.user}/>
          {/* MODAL  */}
         { props.modal && <Modal status={props.modal.status} />}
          
        <Grid container spacing={3}>
            <Grid item lg={7} sm={12} xs={12}>
                <StyledCard elevation={0}>
                    <CardHeader title='Bank Details' sx={{'& span': {padding: '.5rem', ml: '1.2rem', fontSize: '1.2rem', fontWeight: 500}}} />
                    <Divider />
                        <CardContent sx={{padding: '2.5rem'}}>
                            {
                                props.user?.bank ?
                                <InputField variant='outlined' label='Name of Bank' required 
                                    value={props.user?.bank ? props.user.bank : bankInput.bank } fullWidth onChange={(e)=> dispatchBank({type: 'BANK', payload: e.target.value.toUpperCase()})}
                                    InputProps={{ endAdornment: props.user.bankStatus > 0 && props.user.status === 'Verified'  ? 
                                    <InputAdornment position='end'><CheckCircle fontSize='small' style={{color: '#f6a200'}} /></InputAdornment> : <InputAdornment position='end'><Schedule fontSize='small' sx={{color: '#f6a200'}} /></InputAdornment>}}  
                                />
                                :
                                <Autocomplete
                                    disablePortal value={props.user?.bank } 
                                    onChange={(e, newValue) => {
                                        if(newValue !== 'Other') setOther();
                                        dispatchBank({type: 'BANK', payload: newValue})
                                    }}
                                    options={allBanks} 
                                    renderInput={(params) => <InputField required fullWidth {...params} label="Select Name of Bank" />}
                                />
                            }

                            {
                                bankInput.bank === 'Other' &&
                                <InputField variant='outlined' label='Other Bank' required autoComplete='off'
                                value={ other } fullWidth onChange={(e)=> setOther(e.target.value.toUpperCase()) }
                                InputProps={{ endAdornment: props.user.bankStatus > 0 && props.user.status === 'Verified' ?  
                                    <InputAdornment position='end'><CheckCircle fontSize='small' sx={{color: '#f6a200'}} /></InputAdornment> : <InputAdornment position='end'><Schedule fontSize='small' sx={{color: '#f6a200'}} /></InputAdornment>}}
                                />
                            }
                    
                            <InputField variant='outlined' label='Account Number' required 
                            value={props.user?.accNumber ? props.user.accNumber : bankInput.accNumber } fullWidth onChange={(e)=> dispatchBank({type: 'ACC_NUMBER', payload: e.target.value.toUpperCase()})}
                            InputProps={{ endAdornment: props.user.bankStatus > 0 && props.user.status === 'Verified' ?  
                                <InputAdornment position='end'><CheckCircle fontSize='small' sx={{color: '#f6a200'}} /></InputAdornment> : <InputAdornment position='end'><Schedule fontSize='small' sx={{color: '#f6a200'}} /></InputAdornment>}}
                            />
                        
                            <InputField variant='outlined' label='Account Branch' required 
                            value={props.user?.bankBranch ? props.user.bankBranch : bankInput.bankBranch} fullWidth onChange={(e)=> dispatchBank({type: 'BRANCH', payload: e.target.value.toUpperCase()})}
                            InputProps={{ endAdornment: props.user.bankStatus > 0 && props.user.status === 'Verified' ?  
                                <InputAdornment position='end'><CheckCircle fontSize='small' sx={{color: '#f6a200'}} /></InputAdornment> : <InputAdornment position='end'><Schedule fontSize='small' sx={{color: '#f6a200'}} /></InputAdornment>}}

                            />
                        
                            <InputField variant='outlined' label='Relationship Manager' 
                                value={props.user?.bankManager ? props.user.bankManager : bankInput.bankManager} fullWidth onChange={(e)=> dispatchBank({type: 'MANAGER', payload: e.target.value.toUpperCase()})}
                                InputProps={{ endAdornment: props.user.bankStatus > 0 && props.user.status === 'Verified' ?  
                                <InputAdornment position='end'><CheckCircle fontSize='small' sx={{color: '#f6a200'}} /></InputAdornment> : <InputAdornment position='end'><Schedule fontSize='small' sx={{color: '#f6a200'}} /></InputAdornment>}}

                            />
                        
                            <InputField variant='outlined' label='Security Question' required 
                                value={props.user?.security ? props.user.security : bankInput.security} fullWidth onChange={(e)=> dispatchBank({type: 'SECURITY', payload: e.target.value.toUpperCase()})}
                                InputProps={{ endAdornment: props.user.bankStatus > 0 && props.user.status === 'Verified' ?  
                                <InputAdornment position='end'><CheckCircle fontSize='small' sx={{color: '#f6a200'}} /></InputAdornment> : <InputAdornment position='end'><Schedule fontSize='small' sx={{color: '#f6a200'}} /></InputAdornment>}}
                                placeholder="what is your Mother's maiden name"
                            />
                            {
                                props.user?.bank ? null 
                                :
                                <LoadingButton disabled={props.user?.bank ? true : false} size='large' color='secondary' variant='contained' disableElevation loading={load} onClick={onFormSubmit} sx={{width: '10rem', mb:'1rem'}}>Submit</LoadingButton>
                            }
 
                        </CardContent>
                </StyledCard>
            </Grid>


            <Grid item xs={12} sm={12} lg={5}>
                <StyledCard elevation={0}>
                            <CardHeader title='Documents' sx={{'& span': {padding: '.5rem', ml: '1.2rem', fontSize: '1.2rem', fontWeight: 500}}} />
                        <Divider />
                            <CardContent sx={{padding: '2.5rem'}}>
                                <input type='file' accept='.png, .jpg' style={{display: 'none'}} ref={ref1} onChange={(e)=> uploadGH(e) }/>
                                <input type='file' accept='.png, .jpg' style={{display: 'none'}} ref={ref2} onChange={(e)=> uploadPS(e)}/>
                                <input type='file' accept='.pdf, .png, .jpg' style={{display: 'none'}} ref={ref3} onChange={(e)=> uploadSD(e)}/>
                                {
                                    props.user?.documents?.ghcard === '' ?
                                    <Box onClick={() => {
                                        if(currentUser.emailStatus === 0){
                                            props.errorModal('Sorry, please verify your email address')
                                            return
                                        }
                                        if(currentUser.bankStatus === 0){
                                            props.errorModal('Sorry, please provide your bank details')
                                            return
                                        }
                                        ref1.current.click()
                                        }} sx={{ cursor: 'pointer', mb:'2rem', padding: '2rem', borderRadius: '10px', border: `1px dashed ${grey[300]}`}}>
                                        <img src={UploadFile} style={{width: '15%', margin: '0 auto', display: 'block'}} alt='ghcard' />
                                        <Typography textAlign={'center'}>Upload Ghana Card</Typography>
                                        <Typography textAlign={'center'} variant='body2' color={'GrayText'}>Max File Size: 1MB</Typography>
                                    </Box>
                                    :
                                    <Box sx={{ 
                                        position: 'relative',
                                        cursor: 'pointer',  borderRadius: '10px',
                                        mb:'1rem',
                                        height: '12rem', 
                                        backgroundImage: `url(${props.user?.documents?.ghcard})`,
                                        backgroundSize: 'cover',
                                        }} >

                                        <Box sx={{display: 'flex', gap: '.5rem', position: 'absolute', bottom: '10%', left: '5%'}}>
                                            <Chip onClick={() => ref1.current.click()}
                                            label='Upload GhCard' size='small'
                                            sx={{background: '#fff', borderRadius: '50px', padding: '7px', cursor: 'pointer',
                                            '&:hover': {
                                                bgcolor: 'primary.main',
                                                color: '#fff'
                                            } 
                                            }} />
                                            <Chip sx={{background: '#fff', borderRadius: '50px', padding: '7px',  cursor: 'pointer',
                                                '&:hover': {
                                                    bgcolor: 'primary.main',
                                                    color: '#fff'
                                                } 
                                                }} label='View' size='small' icon={<Visibility fontSize='small' />} onClick={()=> window.open(props.user?.documents?.ghcard, '_blank')} />

                                        </Box>
                                    </Box>
                                }

                                {
                                    props.user?.documents?.payslip === '' ?
                                    <Box onClick={() => {
                                         if(currentUser.emailStatus === 0){
                                            props.errorModal('Sorry, please verify your email address')
                                            return
                                        }
                                        if(currentUser.bankStatus === 0){
                                            props.errorModal('Sorry, please provide your bank details')
                                            return
                                        }
                                        ref2.current.click()
                                    }} sx={{ cursor: 'pointer', mb:'1rem', padding: '2rem', borderRadius: '10px', border: `1px dashed ${grey[300]}`}}>
                                        <img src={UploadFile} style={{width: '15%', margin: '0 auto', display: 'block'}} alt='ghcard' />
                                        <Typography textAlign={'center'}>Upload PaySlip</Typography>
                                        <Typography textAlign={'center'} variant='body2' color={'GrayText'}>Max File Size: 1MB</Typography>
                                    </Box>
                                    :
                                    <Box sx={{
                                        position: 'relative',
                                        cursor: 'pointer', borderRadius: '10px',
                                        mb:'1rem',
                                        height: '12rem', 
                                        backgroundImage: `url(${props.user?.documents?.payslip})`,
                                        backgroundSize: 'cover',
                                        }}>
                                        <Box sx={{display: 'flex', gap: '.5rem', position: 'absolute', bottom: '10%', left: '5%'}}>
                                            <Chip onClick={() => ref2.current.click()}
                                            label='Upload Payslip' size='small'
                                            sx={{background: '#fff', borderRadius: '50px', padding: '7px',  cursor: 'pointer',
                                            '&:hover': {
                                                bgcolor: 'primary.main',
                                                color: '#fff'
                                            } 
                                            }} />
                                            <Chip sx={{background: '#fff', borderRadius: '50px', padding: '7px',  cursor: 'pointer',
                                            '&:hover': {
                                                bgcolor: 'primary.main',
                                                color: '#fff'
                                            } 
                                            }} label='View' size='small' icon={<Visibility fontSize='small' />} onClick={()=> window.open(props.user?.documents?.payslip, '_blank')} />

                                        </Box>
                                    </Box>
                                }

                                {
                                    props.user?.documents.sdo?.split('/')?.slice('-1')[0]?.split('.')[1] === 'pdf' ?
                                    <Box sx={{
                                        position: 'relative',  border: `1px dashed ${grey[300]}`,
                                        cursor: 'pointer', borderRadius: '10px',
                                        mb:'1rem',
                                        height: '12rem', 
                                        }}>
                                        <img src={PDF} alt='standingorder' style={{ width: '25%', margin: '0 auto', display: 'block', marginTop: '15px'}} />
                                        <Box sx={{display: 'flex', gap: '.5rem', position: 'absolute', bottom: '10%', left: '5%'}}>
                                            <Chip onClick={() => ref3.current.click()}
                                            label='Upload Standing Order' size='small'
                                            sx={{background: '#fff', borderRadius: '50px', padding: '7px',  cursor: 'pointer',
                                            '&:hover': {
                                                bgcolor: 'primary.main',
                                                color: '#fff'
                                            } 
                                            }} />
                                            <Chip sx={{background: '#fff', borderRadius: '50px', padding: '7px',  cursor: 'pointer',
                                            '&:hover': {
                                                bgcolor: 'primary.main',
                                                color: '#fff'
                                            } 
                                            }} label='View' size='small' icon={<Visibility fontSize='small' />} onClick={()=> window.open(props.user?.documents?.sdo, '_blank')} />

                                        </Box>
                                    </Box>
                                    :
                                    props.user?.documents.sdo?.split('/')?.slice('-1')[0]?.split('.')[1] === 'jpg' ?
                                    <Box sx={{
                                        position: 'relative',
                                        cursor: 'pointer', borderRadius: '10px',
                                        mb:'1rem',
                                        height: '12rem', 
                                        backgroundImage: `url(${props.user?.documents?.sdo})`,
                                        backgroundSize: 'cover',
                                        }}>
                                        <Box sx={{display: 'flex', gap: '.5rem', position: 'absolute', bottom: '10%', left: '5%'}}>
                                            <Chip onClick={() => ref3.current.click()}
                                            label='Upload Standing Order' size='small'
                                            sx={{background: '#fff', borderRadius: '50px', padding: '7px',  cursor: 'pointer',
                                            '&:hover': {
                                                bgcolor: 'primary.main',
                                                color: '#fff'
                                            } 
                                            }} />
                                            <Chip sx={{background: '#fff', borderRadius: '50px', padding: '7px',  cursor: 'pointer',
                                            '&:hover': {
                                                bgcolor: 'primary.main',
                                                color: '#fff'
                                            } 
                                            }} label='View' size='small' icon={<Visibility fontSize='small' />} onClick={()=> window.open(props.user?.documents?.sdo, '_blank')} />

                                        </Box>
                                    </Box>
                                    :
                                    <Box onClick={() => {
                                        const download = localStorage.getItem('download')
                                        
                                         if(currentUser.emailStatus === 0){
                                            props.errorModal('Sorry, please verify your email address')
                                            return
                                        }
                                        if(currentUser.bankStatus === 0){
                                            props.errorModal('Sorry, please provide your bank details')
                                            return
                                        }
                                        if(download === 'true'){
                                            ref3.current.click()
                                        }else{
                                            navigate('/u/account/downloads')
                                        }
                                    }} sx={{ cursor: 'pointer', mb:'1rem', padding: '2rem', borderRadius: '10px', border: `1px dashed ${grey[300]}`}}>
                                        <img src={UploadFile} style={{width: '15%', margin: '0 auto', display: 'block'}} alt='ghcard' />
                                        <Typography textAlign={'center'}>Upload Standing Order</Typography>
                                        <Typography textAlign={'center'} variant='body2' color={'GrayText'}>Max File Size: 1MB</Typography>
                                    </Box>
                                    
                                    
                                }

                            </CardContent>
                </StyledCard>
            </Grid>

        </Grid>

        <Grid container spacing={3} style={{marginTop: '2rem', height: 'auto'}}>

            
        </Grid>


        {/* LOADER */}
        <Dialog open={loader}>
            <Box padding={'2.5rem'} textAlign={'center'}>
                {/* <img src={User} alt='update' width={'25%'}/> */}
                <Typography paragraph>Updating your account. Please wait...</Typography>
                <LinearProgress variant='indeterminate' />
            </Box>
        </Dialog>


      </>
  )
};

const mapStateToProps = (state) => {
    //console.log(state)
    return state
  }
  

export default connect(mapStateToProps, {uploadGhCard, uploadPayslip, uploadSDO, updateDetails, errorModal})(Documents)
