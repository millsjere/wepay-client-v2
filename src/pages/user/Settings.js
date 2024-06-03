import { Button, Card, CardContent, CardHeader, Divider, FormControlLabel, Grid, InputAdornment, Switch, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, {useReducer, useState} from 'react';
import PageHeader from './dashboard/PageHeader';
import {connect} from 'react-redux'
import Modal from '../../components/Modal';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { grey } from '@material-ui/core/colors';
import { changePassword, errorModal } from '../../actions/actions';


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
    padding: '2rem'
  },
  field:{
    marginBottom: '1.5rem',
    '& label.Mui-focused':{
      color: theme.primaryColorOrange
    },
    
  },
  fieldIcon: {
    color: grey[400],
    cursor: 'pointer',
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
  card: {
    '&:hover': {
        boxShadow: 'rgb(32 40 45 / 8%) 0px 2px 14px 0px'
    }
  }
}))


const Settings = (props) => {
  const classes = useStyles()
  const [show, setShow] = useState(false)
  const [pass, setPass] = useState(false)

  const reducerFn = ( state, action ) => {
    switch (action.type) {
      case "PASSWORD":
        return {...state, oldPass: action.payload}
      case "NEW_PASSWORD":
        return {...state, newPass: action.payload}
      case "RESET":
        return { password: '', newPass: '' }
      default:
        return state;
    }
  }

  const [formInput, dispatch] = useReducer(reducerFn, { oldPass: '', newPass: '' })

  const onFormSubmit = (e) =>{
    e.preventDefault();
    if(formInput.oldPass === '' || formInput.newPass === ''){
      return
    }
    if(formInput.newPass.length < 6){
      props.errorModal('Password must be more than 6 characters')
      return 
    }
    props.changePassword(formInput)
  }



  return (
    <>
    {/* MODAL */}
    {props.modal && <Modal status={props.modal.status} /> }
    <PageHeader title={'User Settings'} link2={'settings'} user={props.user}/>

      <Grid container className={classes.root} spacing={4}>
        <Grid item lg={8} md={12} sm={12} xs={12}>
          <Card variant='outlined' elevation={0}  className={classes.card}>
            <CardHeader title='Password & Security' className={classes.caption} />
            <Divider />
            <CardContent className={classes.wrapper}>

            <form onSubmit={onFormSubmit} >
              <TextField variant='outlined' label='Email address' value={props.user.email} fullWidth className={classes.field} disabled/>
              
              <TextField variant='outlined' label='Current Password' type={show ? 'text' : 'password'} value={formInput.oldPass} onChange={(e)=> dispatch({type: "PASSWORD", payload: e.target.value})}
              InputProps={{ endAdornment: <InputAdornment position='end'>{ show ? <Visibility className={classes.fieldIcon} onClick={()=>setShow(!show)} /> : <VisibilityOff className={classes.fieldIcon} onClick={()=>setShow(!show)} /> }</InputAdornment>
              }} fullWidth className={classes.field} />
              
              <TextField variant='outlined' label='New Password' type={ pass ? 'text' : 'password'} value={formInput.newPass} onChange={(e)=> dispatch({type: "NEW_PASSWORD", payload: e.target.value})}
              InputProps={{ endAdornment: <InputAdornment position='end'>{ pass ? <Visibility className={classes.fieldIcon} onClick={()=>setPass(!pass)} /> : <VisibilityOff className={classes.fieldIcon} onClick={()=>setPass(!pass)} /> }</InputAdornment>
              }} fullWidth className={classes.field}/>
              
              <Button className={classes.btn} disableElevation type='submit' >Update Settings</Button>
            </form>

            </CardContent>
          </Card>
        </Grid>

        <Grid item lg={4} md={12} sm={12} xs={12}>
          <Card elevation={0} variant='outlined' className={classes.card}>
            <CardHeader title='Settings' className={classes.caption} />
            <Divider />
            <CardContent className={classes.wrapper}>
                <FormControlLabel label='Two-Factor Authentication (2FA)' control={<Switch checked />} />
                <FormControlLabel label='Email Notifications' control={<Switch checked />} />
                <FormControlLabel label='SMS Notifications' control={<Switch />} />
            </CardContent>
          </Card>
        
        </Grid>
      </Grid>
    </>
  )
};

const mapStateToProps =(state) => {
  return state
}

export default connect(mapStateToProps, {changePassword, errorModal})(Settings)
