import { Avatar, Box, Button, Card, CardContent, CardHeader, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, InputAdornment, TextField, Typography } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { CameraAlt, CheckCircle, Edit, SaveAlt, Schedule, Visibility, CalendarToday } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import React, { useReducer, useRef, useState } from 'react';
import PageHeader from './dashboard/PageHeader';
import { connect } from 'react-redux';
import { updateDetails, uploadDocuments, errorModal } from '../../actions/actions';
import Modal from '../../components/Modal';


const useStyles = makeStyles(theme => ({
  root : {
    '& *': {
      borderRadius: '8px'
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        border: `1px solid ${theme.primaryColorOrange}`
      }
    }

  },
  caption: {
    '& span': {
      fontSize: '1.1rem',
      padding: '.5rem'
    }
  },
  wrapper: {
    padding: '2.5rem'
  },
  field:{
    marginBottom: '1.5rem',
    '& label.Mui-focused':{
      color: theme.primaryColorOrange
    },
    
  },
  btn: {
    width:'12rem',
    background: theme.primaryColorOrange,
    padding: '.8rem 0',
    color: '#fff',
    borderRadius: '8px',
    marginBottom: '2rem',
    '&:hover' : {
      background: theme.secondaryColorDark
    }
  },
  userImage : {
    width: theme.spacing(14),
    height: theme.spacing(14),
    margin: '0 auto',
    marginBottom: '1.5rem',
    borderRadius: '50%',
    
  },
  card: {
    '&:hover': {
        boxShadow: 'rgb(32 40 45 / 8%) 0px 2px 14px 0px'
    }
  },
  upload : {
    minWidth: '350px',
    padding: '.7rem',
    textAlign: 'center',
    border: `1px solid ${grey[300]}`,
    borderRadius: '8px',
    marginBottom: '1.5rem',
    cursor: 'pointer',
    '&:hover' : {
      background: grey[100]
    }
  },
  editIcon : {
    fontSize: '.9rem',
    marginRight: '2rem',
    padding: '0 .5rem',
    borderRadius: '50px',
    background: theme.secondaryColorDark,
    color: '#fff'
  },
  documents: {
    height: '7.5rem',
    backgroundSize: 'cover',
    backgroundPosition:'center',
    border: `1px solid ${grey[300]}`,
    borderRadius: '8px',
    marginBottom: '1rem',
  }
}))

const Profile = (props) => {
    const classes = useStyles()
    const[open, setOpen] = useState(false)
    const[openBank, setOpenBank] = useState(false)
    const[openDocument, setOpenDocument] = useState(false)
    const ref1 = useRef()
    const ref2 = useRef()
    const ref3 = useRef()
    const pix = useRef()

  
  //reducer Function //
  const personalReducerFn = (state, action) => {
    switch (action.type) {
      case "NAME":
        return {...state, name: action.payload}
      case "ADDRESS":
        return {...state, address: action.payload} 
      case "PHONE":
        return {...state, phone: action.payload}  
      case "OCCUPATION":
        return {...state, occupation: action.payload}
      case "COMPANY":
        return {...state, company: action.payload}    
      case "COMPANY_ADDRESS":
        return {...state, companyAddress: action.payload}     
      case "RESET":
        return {name: '', address: '', phone: '', occupation: '', company: '', companyAddress: ''}
      default:
        return state;
    }
  }

  const bankReducerFn = (state, action) => {
    switch (action.type) {
      case "BANK":
        return {...state, bank: action.payload.trim()}
      case "ACC_NUMBER":
        return {...state, accNumber: action.payload.trim()} 
      case "BRANCH":
        return {...state, bankBranch: action.payload.trim()}    
      case "SECURITY":
          return {...state, security: action.payload.trim()}   
      case "RESET": 
        return {bank: '', accNumber: '', bankBranch: '', security: ''}
      default:
        return state;
    }
  }

  const uploadReducerFn = (state, action) => {
    switch (action.type) {
      case "PAYSLIP":
        return {...state, payslip: action.payload}
      case "SDO":
        return {...state, sdo: action.payload} 
      case "GHCARD":
        return {...state, ghCard: action.payload}    
      case "RESET":
        return {payslip: '', sdo: '', ghCard: ''}
      default:
        return state;
    }
  }
  const [personalInput, dispatchPersonal] = useReducer(personalReducerFn, {name: '', address: '', phone: '', occupation: '', company: '', companyAddress: ''})
  const [bankInput, dispatchBank] = useReducer(bankReducerFn, {bank: '', accNumber: '', bankBranch: '', security: ''})
  const [uploadInput, dispatchUpload] = useReducer(uploadReducerFn, {payslip: '', sdo: '', ghCard: ''})

const closeDialog = (val) => {
  if(val === 'personal'){
    setOpen(false)
    dispatchPersonal({type: "RESET"})
  }
  if(val === 'bank'){
    setOpenBank(false)
    dispatchBank({type: "RESET"})
  }
  if(val === 'doc'){
    setOpenDocument(false)
    dispatchUpload({type: "RESET"})
  }
}

const onFormSubmit = (e, field) => {
  e.preventDefault()
  if(field === 'Personal'){
    props.updateDetails(personalInput, field)
    setOpen(false)
    dispatchPersonal({type: "RESET"})
    return
  }
  if(field === 'Bank'){
    props.updateDetails(bankInput, field)
    setOpenBank(false)
    dispatchBank({type: "RESET"})
    return
  }
  if(field === 'Documents'){
    if(uploadInput.payslip === '' || uploadInput.sdo === '' || uploadInput.ghCard === '') {
      props.errorModal('Sorry, please upload all document fields to sumbit')
      return
    }
    const formData = new FormData()
    formData.append('gallery[]', uploadInput.payslip)
    formData.append('gallery[]', uploadInput.sdo)
    formData.append('gallery[]', uploadInput.ghCard)

    props.uploadDocuments(formData, field)
    setOpenDocument(false)
    dispatchUpload({type: "RESET"})
  }
  if(field === 'Photo'){
    const formData = new FormData()
    formData.append('gallery[]', e.target.files[0])

    props.uploadDocuments(formData, field)
  }
  
}


  return (
    <>

    <PageHeader title={'User Profile'} link2={'Profile'} user={props.user}/>
    {/* MODAL */}
    {props.modal && <Modal status={props.modal.satus} />}

    <Grid container className={classes.root} spacing={4}>
      <Grid item lg={8} md={12}>
          <Card variant='outlined' elevation={0} className={classes.card} style={{marginBottom: '1.5rem'}}>
            <Box style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <CardHeader title='Personal Details' className={classes.caption} />
            <Chip label={<Typography variant='body2'>{props.user.status}</Typography>} className={classes.editIcon}/>
            </Box>
            <Divider />
            <CardContent className={classes.wrapper}>
            <form >
              <Grid container spacing={3}>
                  <Grid item sm={6} xs={12}>
                  <TextField variant='outlined' label='Fullname' value={props.user.fullname} fullWidth className={classes.field}
                  InputProps={{ endAdornment: props.user.bankStatus > 0 && props.user.status === 'Approved' ?  
                  <InputAdornment position='end'><CheckCircle style={{color: '#f6a200'}} /></InputAdornment> : <InputAdornment position='end'><Schedule style={{color: '#f6a200'}} /></InputAdornment>}}
                   />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                  <TextField variant='outlined' label='Residence Address' value={props.user.address} fullWidth 
                  className={classes.field} InputProps={{ endAdornment: props.user.bankStatus > 0 && props.user.status === 'Approved' ?  
                  <InputAdornment position='end'><CheckCircle style={{color: '#f6a200'}} /></InputAdornment> : <InputAdornment position='end'><Schedule style={{color: '#f6a200'}} /></InputAdornment>}}/>
                  </Grid>
              </Grid>
              <Grid container spacing={3}>
                  <Grid item sm={6} xs={12}>
                  <TextField variant='outlined' label='Phone' value={props.user.phone} fullWidth 
                  InputProps={{ endAdornment: props.user.bankStatus > 0 && props.user.status === 'Approved' ?  
                  <InputAdornment position='end'><CheckCircle style={{color: '#f6a200'}} /></InputAdornment> : <InputAdornment position='end'><Schedule style={{color: '#f6a200'}} /></InputAdornment>}} 
                  className={classes.field}/>
                  </Grid>
                  <Grid item sm={6} xs={12}>
                  <TextField variant='outlined' label='Occupation' value={props.user.occupation} fullWidth 
                  className={classes.field} InputProps={{ endAdornment: props.user.bankStatus > 0 && props.user.status === 'Approved' ?  
                  <InputAdornment position='end'><CheckCircle style={{color: '#f6a200'}} /></InputAdornment> : <InputAdornment position='end'><Schedule style={{color: '#f6a200'}} /></InputAdornment>}}/>
                  </Grid>
              </Grid>
              <Grid container spacing={3}>
                  <Grid item sm={6} xs={12}>
                  <TextField variant='outlined' label='Company' value={props.user.company} fullWidth 
                  className={classes.field} InputProps={{ endAdornment: props.user.bankStatus > 0 && props.user.status === 'Approved' ?  
                  <InputAdornment position='end'><CheckCircle style={{color: '#f6a200'}} /></InputAdornment> : <InputAdornment position='end'><Schedule style={{color: '#f6a200'}} /></InputAdornment>}}/>
                  </Grid>
                  <Grid item sm={6} xs={12}>
                  <TextField variant='outlined' label='Company Address' value={props.user.companyAddress} fullWidth  
                  className={classes.field} InputProps={{ endAdornment: props.user.bankStatus > 0 && props.user.status === 'Approved' ?  
                  <InputAdornment position='end'><CheckCircle style={{color: '#f6a200'}} /></InputAdornment> : <InputAdornment position='end'><Schedule style={{color: '#f6a200'}} /></InputAdornment>}}/>
                  </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item sm={6} xs={12}>
                <TextField variant='outlined' label='Monthly Salary' value={`${parseInt(props.user.monthlySalary).toLocaleString()}`} fullWidth 
                className={classes.field} InputProps={{ 
                  startAdornment: <InputAdornment position='start'>GH¢</InputAdornment>,
                  endAdornment: props.user.bankStatus > 0 && props.user.status === 'Approved' ?  
                  <InputAdornment position='end'><CheckCircle style={{color: '#f6a200'}} /></InputAdornment> : <InputAdornment position='end'><Schedule style={{color: '#f6a200'}} /></InputAdornment>}}/>
                </Grid>
                <Grid item sm={6} xs={12}>
                <TextField variant='outlined' label='National ID' value={`${props.user.nationalID.number}`} fullWidth 
                className={classes.field} InputProps={{ 
                  startAdornment: <InputAdornment position='start'>{props.user.nationalID.idType}</InputAdornment>,
                  endAdornment: props.user.bankStatus > 0 && props.user.status === 'Approved' ?  
                  <InputAdornment position='end'><CheckCircle style={{color: '#f6a200'}} /></InputAdornment> : <InputAdornment position='end'><Schedule style={{color: '#f6a200'}} /></InputAdornment>}}/>
                </Grid>
                
            </Grid>
            <Grid container spacing={3}>
                <Grid item sm={6} xs={12}>
                <TextField variant='outlined' label='Date of Birth' value={`${props.user.dob}`} fullWidth 
                className={classes.field} InputProps={{ 
                  startAdornment: <InputAdornment position='start'> <CalendarToday /> </InputAdornment>,
                  endAdornment: props.user.bankStatus > 0 && props.user.status === 'Approved' ?  
                  <InputAdornment position='end'><CheckCircle style={{color: '#f6a200'}} /></InputAdornment> : <InputAdornment position='end'><Schedule style={{color: '#f6a200'}} /></InputAdornment>}}/>
                </Grid>

                {/* <Grid item sm={6} xs={12}>
                <TextField variant='outlined' label='Loan Amount' value={props.user.loan.length > 0 ? `${props.user.loan[0].total.toLocaleString()}.00` : '0.00'} fullWidth 
                className={classes.field} InputProps={{ 
                  startAdornment: <InputAdornment position='start'>GH¢</InputAdornment>,
                  endAdornment: props.user.bankStatus > 0 && props.user.status === 'Approved' ?  
                  <InputAdornment position='end'><CheckCircle style={{color: '#f6a200'}} /></InputAdornment> : <InputAdornment position='end'><Schedule style={{color: '#f6a200'}} /></InputAdornment>}}/>
                </Grid> */}

            </Grid>
            </form>

            </CardContent>
          </Card>
          
          {/* BANK DETAILS */}
          <Card variant='outlined' elevation={0} className={classes.card}>
          <Box style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <CardHeader title='Bank Details' className={classes.caption} />
            { props.user.bankStatus !== 0 ? <Chip label={<Typography variant='body2'>{props.user.status}</Typography> } className={classes.editIcon}/> :
             <Chip label={<Typography variant='body2'>Add</Typography>} icon={ <Edit fontSize='small' style={{color:'#fff'}} />} className={classes.editIcon} onClick={()=>{setOpenBank(true)}}/> }
          </Box>
            <Divider />
            <CardContent className={classes.wrapper}>
            { props.user.bankStatus === 0 ? null :
              <>
                <Grid container spacing={3}>
                  <Grid item sm={6} xs={12}>
                  <TextField variant='outlined' label='Name of Bank' value={props.user.bank } fullWidth className={classes.field} InputProps={{ endAdornment: props.user.bankStatus > 0 && props.user.status === 'Approved'  ? 
                  <InputAdornment position='end'><CheckCircle style={{color: '#f6a200'}} /></InputAdornment> : <InputAdornment position='end'><Schedule style={{color: '#f6a200'}} /></InputAdornment>}}  />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                  <TextField variant='outlined' label='Account Number' value={props.user.accNumber } fullWidth className={classes.field} InputProps={{ endAdornment: props.user.bankStatus > 0 && props.user.status === 'Approved' ?  
                  <InputAdornment position='end'><CheckCircle style={{color: '#f6a200'}} /></InputAdornment> : <InputAdornment position='end'><Schedule style={{color: '#f6a200'}} /></InputAdornment>}}/>
                  </Grid>
                </Grid>
                  <Grid container spacing={3}>
                      <Grid item sm={6} xs={12}>
                      <TextField variant='outlined' label='Account Branch' value={props.user.bankBranch} fullWidth className={classes.field} InputProps={{ endAdornment: props.user.bankStatus > 0 && props.user.status === 'Approved' ?  
                      <InputAdornment position='end'><CheckCircle style={{color: '#f6a200'}} /></InputAdornment> : <InputAdornment position='end'><Schedule style={{color: '#f6a200'}} /></InputAdornment>}}/>
                      </Grid>
                      <Grid item sm={6} xs={12}>
                      <TextField variant='outlined' label='Security Question' value={props.user.security} fullWidth className={classes.field} InputProps={{ endAdornment: props.user.bankStatus > 0 && props.user.status === 'Approved' ?  
                      <InputAdornment position='end'><CheckCircle style={{color: '#f6a200'}} /></InputAdornment> : <InputAdornment position='end'><Schedule style={{color: '#f6a200'}} /></InputAdornment>}}/>
                      
                      </Grid>
                  </Grid>
              </>
            }
            
          </CardContent>
        </Card>
      </Grid>

      {/* PROFILE PHOTO */}
      <Grid item lg={4} md={12} sm={12} xs={12}>
        <Card elevation={0} variant='outlined' className={classes.card} style={{marginBottom: '1.5rem'}}>
          <Box style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>

            <input type='file' accept='.png, .jpg' style={{display: 'none'}} ref={pix} onChange={(e)=> onFormSubmit(e, 'Photo')}/>

            <CardHeader title='Profile Photo' className={classes.caption} />
            <Chip label={<Typography variant='body2'>Upload</Typography>} icon={<CameraAlt fontSize='small' style={{color:'#fff'}} />} className={classes.editIcon} onClick={ () => pix.current.click() }/> 
          </Box>
          <Divider />
          <CardContent className={classes.wrapper} style={{textAlign: 'center'}}>
          <Avatar className={classes.userImage} src={props.user.photo ? props.user.photo : null} />
            <Typography paragraph variant='body2' color='textSecondary' >
                Change Your Profile Image
            </Typography>
          </CardContent>
        </Card>

        {/* DOCUMENTS */}
        <Card elevation={0} variant='outlined' className={classes.card} >
        <Box style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <CardHeader title='Documents' className={classes.caption} />
            { props.user.fileStatus !== 0 ? <Chip label={<Typography variant='body2'>{props.user.status}</Typography>} className={classes.editIcon}/> :
             <Chip label={<Typography variant='body2'>Upload</Typography>} icon={<SaveAlt fontSize='small' style={{color:'#fff'}} />} className={classes.editIcon} onClick={()=>{setOpenDocument(true)}}/> }
          </Box>
          <Divider />
          <CardContent className={classes.wrapper} style={{textAlign: 'center'}}>
                <Box className={classes.documents} style={{position:'relative', backgroundImage: `url('${props.user.documents.payslip}')`,}}>
                  <Chip label='Payslip' icon={<Visibility fontSize='small' />} style={{background: '#fff', borderRadius: '50px', padding: '7px', position: 'absolute', bottom: '10%', left: '5%'}} />
                </Box>
                <Box className={classes.documents} style={{position:'relative', backgroundImage: `url('${props.user.documents.sdo}')`,}}>
                <Chip label='Standing Order' icon={<Visibility fontSize='small' />} style={{background: '#fff', borderRadius: '50px', padding: '7px', position: 'absolute', bottom: '10%', left: '5%'}} />
                </Box>
                <Box className={classes.documents} style={{position:'relative', backgroundImage: `url('${props.user.documents.ghcard}')`,}}>
                <Chip label='Ghana Card' icon={<Visibility fontSize='small' />} style={{background: '#fff', borderRadius: '50px', padding: '7px', position: 'absolute', bottom: '10%', left: '5%'}} />
                </Box>
            
          </CardContent>
        </Card>
      </Grid>

      
    </Grid>

    {/* PERSONAL EDIT BOX */}
    <Dialog open={open} className={classes.root}>
      <DialogTitle>Edit Personal Details</DialogTitle>
      <DialogContent dividers style={{padding: '2.5rem'}}>

                  <TextField variant='outlined' label='Fullname' value={personalInput.name} fullWidth onChange={(e)=>dispatchPersonal({type:"NAME", payload: e.target.value})} className={classes.field} />
                  <TextField variant='outlined' label='Residence Address' value={personalInput.address} fullWidth onChange={(e)=>dispatchPersonal({type:"ADDRESS", payload: e.target.value})} className={classes.field}/>
                  <TextField variant='outlined' label='Phone' value={personalInput.phone} fullWidth onChange={(e)=>dispatchPersonal({type:"PHONE", payload: e.target.value})} className={classes.field}/>
                  <TextField variant='outlined' label='Occupation' value={personalInput.occupation} fullWidth onChange={(e)=>dispatchPersonal({type:"OCCUPATION", payload: e.target.value})} className={classes.field}/>
                  <TextField variant='outlined' label='Company' value={personalInput.company} fullWidth onChange={(e)=>dispatchPersonal({type:"COMPANY", payload: e.target.value})} className={classes.field}/>
                  <TextField variant='outlined' label='Company Address' value={personalInput.companyAddress} fullWidth onChange={(e)=>dispatchPersonal({type:"COMPANY_ADDRESS", payload: e.target.value})} className={classes.field}/>
                  
                 
      </DialogContent>
      <DialogActions style={{padding: '1rem 2rem'}}>
          <Button onClick={()=>closeDialog('personal')} color="secondary" >
            Cancel
          </Button>
          <Button onClick={(e)=>{onFormSubmit(e, 'Personal')}} color="secondary" >
            Save Changes
          </Button>
        </DialogActions>
    </Dialog>

    {/* BANK EDIT BOX */}
    <Dialog open={openBank} className={classes.root}>
      <DialogTitle>Edit Bank Details</DialogTitle>
      <DialogContent dividers style={{padding: '2.5rem'}}>

        <TextField variant='outlined' label='Name of Bank' value={bankInput.bank} fullWidth onChange={(e)=>dispatchBank({type:"BANK", payload: e.target.value})} className={classes.field} />
        <TextField variant='outlined' label='Account Number' value={bankInput.accNumber} fullWidth onChange={(e)=>dispatchBank({type:"ACC_NUMBER", payload: e.target.value})} className={classes.field}/>
        <TextField variant='outlined' label='Account Branch' value={bankInput.bankBranch} fullWidth onChange={(e)=>dispatchBank({type:"BRANCH", payload: e.target.value})} className={classes.field}/>
        <TextField variant='outlined' label="Security Question" placeholder="What is your mother's name" value={bankInput.occupation} fullWidth onChange={(e)=>dispatchBank({type:"SECURITY", payload: e.target.value})} className={classes.field}/>
                 
      </DialogContent>
      <DialogActions style={{padding: '1rem 2rem'}}>
          <Button onClick={()=>closeDialog('bank')} color="secondary" >
            Cancel
          </Button>
          <Button onClick={(e)=>{onFormSubmit(e, 'Bank')}} color="secondary" >
            Save Changes
          </Button>
        </DialogActions>
    </Dialog>


    {/* DOCUMENTS BOX */}
    <Dialog open={openDocument} className={classes.root}>
      <DialogTitle>Upload Documents</DialogTitle>
      <DialogContent dividers style={{padding: '2.5rem'}}>
                  <input type='file' accept='.png, .jpg' style={{display: 'none'}} ref={ref1} onChange={(e)=> dispatchUpload({type:"PAYSLIP", payload: e.target.files[0]})}/>
                  <input type='file' accept='.png, .jpg' style={{display: 'none'}} ref={ref2} onChange={(e)=> dispatchUpload({type:"SDO", payload: e.target.files[0]})}/>
                  <input type='file' accept='.png, .jpg' style={{display: 'none'}} ref={ref3} onChange={(e)=> dispatchUpload({type:"GHCARD", payload: e.target.files[0]})}/>
              
              <Box className={classes.upload} onClick={() => ref1.current.click()}>
                <Typography color='textSecondary'>{ uploadInput.payslip === '' ? 'Upload Payslip' : `Uploaded: ${uploadInput.payslip.name}`}</Typography>
                <Typography variant='body2' color='textSecondary'>Max File Size: 0.5MB</Typography>
              </Box>

              <Box className={classes.upload} onClick={() => ref2.current.click()}>
                <Typography color='textSecondary'>{ uploadInput.sdo === '' ? 'Upload Standing Order' : `Uploaded: ${uploadInput.sdo.name}`}</Typography>
                <Typography variant='body2' color='textSecondary'> Max File Size: 0.5MB </Typography> 
              </Box>

              <Box className={classes.upload} onClick={() => ref3.current.click()}>
                <Typography color='textSecondary'>{ uploadInput.ghCard === '' ? 'Upload Ghana Card' : `Uploaded: ${uploadInput.ghCard.name}`}</Typography>
                <Typography variant='body2' color='textSecondary'>Max File Size: 0.5MB</Typography>
              </Box>
      </DialogContent>
      <DialogActions style={{padding: '1rem 2rem'}}>
          <Button onClick={()=>closeDialog('doc')} color="secondary" >
            Cancel
          </Button>
          <Button onClick={(e)=>{onFormSubmit(e, 'Documents')}} color="secondary" >
            Save Changes
          </Button>
        </DialogActions>
    </Dialog>
  </>
  )
};

const mapStateToProps = (state) => {
  //console.log(state)
  return state
}

export default connect(mapStateToProps, {updateDetails, uploadDocuments, errorModal})(Profile);
