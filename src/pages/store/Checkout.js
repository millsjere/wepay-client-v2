import { Box, Breadcrumbs, Button, Card, CardContent, CardHeader, Checkbox, Container, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControlLabel, Grid, InputAdornment, Link,MenuItem,Radio,RadioGroup,TextField, Typography } from '@material-ui/core'
import { grey } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/styles'
import { connect } from 'react-redux'
import React, { useReducer } from 'react'
import { removeFromCart, updateCart, newOrder } from '../../actions/actions'
import Modal from '../../components/Modal'
import VisaCard from '../../assets/images/visa.svg'
import MasterCard from '../../assets/images/mastercard.svg'
import CardPolicy from '../../components/CardPolicy'
import { KeyboardArrowLeft } from '@material-ui/icons'
import CVV from '../../assets/images/card-cvv.svg'



const useStyles = makeStyles(theme => ({
    root : {
        '& *': {
          borderRadius: '8px'
        },
        "& .MuiOutlinedInput-root": {
        "&.Mui-focused fieldset": {
            border: `1px solid ${theme.primaryColorOrange}`
            }
        },
    },
    banner : {
        textAlign: 'center',
        padding: '3rem 0',
        marginBottom: '5rem',
        // borderBottom: '1px solid lightgrey',
        background: grey[50]
    },
    caption: {
        '& span': {
          fontSize: '1.2rem',
          fontWeight: 500,
        }
      },
    card : {
        padding: '1rem',
        borderRadius: '1rem',
        border: '1px solid white',
        boxShadow: '0 4px 20px 1px rgb(0 0 0 / 6%), 0 1px 4px rgb(0 0 0 / 8%)',
    },
    field : {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    summary : {
        display: 'flex',
        flexDirection: 'column',
    },
    checkout : {
        marginTop: '1rem',
        background: theme.primaryColorOrange,
        height: '3rem',
        color: '#fff',
        '&:hover' : {
            background: theme.secondaryColorDark
        }
    },
    update : {
        background: theme.primaryColorOrange,
        color: '#fff',
        height: '2.2rem',
        padding: '0 .8rem',
        borderRadius: '.4rem',
        textTransform: 'none',
        marginRight: '1rem',
        '&:hover': {
            background: theme.secondaryColorDark
        }

    },
    delivery : {
        display: 'flex',
        border: `1px solid ${grey[300]}`,
        padding: '1.5rem 2rem',
        borderRadius: '.5rem',
     
    },
    address : {
        display: 'flex',
        border: `1px solid ${grey[400]}`,
        padding: '1.5rem',
        borderRadius: '.8rem',
        marginBottom: '1rem'
    }
}))


const Checkout = (props) => {
    const classes = useStyles()
    const [value, setValue] = React.useState('standard');
    const [address, setAddress] = React.useState('default');
    const [show, setShow] = React.useState(false)
    const [check, setCheck] = React.useState(false)
    const [open, setOpen] = React.useState(false)
    const [secure, setSecure] = React.useState(false)
    const [security, setSecurity] = React.useState({ans: '', err: ''})

    const months = ['01','02','03','04','05','06','07','08','09','10','11','12']
    const years = ['2022', '2023', '2024', '2025', '2026', '2027']


    // initail state
    const initialState = {
        name: '', 
        address: '', 
        email: '', 
        phone: '',
        city: '',
        delivery: value,
        cardName: '', 
        cardNumber: '', 
        expiryMonth: '', 
        expiryYear: '', 
        cvv: ''
    }

    // checkout reducer
    const checkOutReducer = (state, action) => {
        switch (action.type) {
            case "NAME":
                return {...state, name: action.payload }
            case "ADDRESS":
                return {...state, address: action.payload }
            case "EMAIL":
                return {...state, email: action.payload }
            case "PHONE":
                return {...state, phone: action.payload }
            case "CITY":
                return {...state, city: action.payload }
            case "CARD_NAME":
                return {...state, cardName: action.payload }
            case "CARD_NUMBER":
                return {...state, cardNumber: action.payload }
            case "EXPIRY_MONTH":
                return {...state, expiryMonth: action.payload }
            case "EXPIRY_YEAR":
                return {...state, expiryYear: action.payload }
            case "CODE":
                return {...state, cvv: action.payload }
            case "RESET":
                return initialState        
            default:
                return initialState  
        }
    }

    const [formInput, dispatch] = useReducer(checkOutReducer, initialState)

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const onSelectHandle = () => {
        setOpen(true)
    }

    const closeDialog = () => {
        setOpen(false)
        setCheck(false)
        setSecure(false)
        setSecurity({ans: '', err: ''})
    }

    const policyCheck = () => {
        setOpen(false)
        setCheck(true)
    }

    const securityCheck = (answer) => {
        if(answer.trim().toUpperCase() === props.currentUser.security){
            closeDialog()
            setSecurity({ans: '', err: ''})
            setShow(true)
            setAddress('new')
        }else{
            setSecurity((prev) => {
                return {...prev, err: 'Wrong answer'}
            })
        }
    }

    const onFormSubmit = (e) => {
        e.preventDefault()
        if(address === 'default'){
            const data = {
                ...formInput,
                name: props.currentUser.fullname,
                address: props.currentUser.address,
                email: props.currentUser.email,
                phone: props.currentUser.phone,
                total: value === 'standard' ? props.cart.total + 20 : props.cart.total + 50,
                cart: props.cart.items
            }
            // console.log(data)
            props.newOrder(data)
        }else{
            const data = {
                ...formInput, 
                total: value === 'standard' ? props.cart.total + 20 : props.cart.total + 50,
                cart: props.cart.items
            }
            // console.log(data)
            props.newOrder(data)
        }
        
    }

  return (
    <>
    <Box className={classes.banner}>
    {/* Modal */}
    { props.modal && <Modal status={props.modal.status} /> }
        <Container>
          <Typography variant='h5'>Checkout</Typography>
          <Breadcrumbs style={{justifyContent: 'center', alignItems: 'center', display: 'flex', marginTop:'1rem'}}>
            <Link href='/'>Home</Link>
            <Link href='/shop'>Shop</Link>
            <Typography>Checkout</Typography>
          </Breadcrumbs>
        </Container>
      </Box>

      <Container>
      <Button variant='contained' style={{background: 'transparent', marginBottom: '2rem'}} startIcon={<KeyboardArrowLeft />} disableElevation href='/cart'>Back to Cart</Button>
          <Grid container spacing={3}>
              <Grid item sm={8}>
                <Card variant='outlined' className={classes.card}>
                <Box style={{display:'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <CardHeader title={`Delivery Address`} className={classes.caption} />
                    <Button variant='contained' size='large' disableElevation className={classes.update} onClick={()=>setSecure(true)}>New Address</Button>
                </Box>
                    {/* <Divider /> */}
                    <CardContent style={{padding: '1rem'}} className={classes.root}>
                    <RadioGroup value={address} onChange={(e)=> setAddress(e.target.value)}>
                        <Box className={classes.address}>
                            <FormControlLabel value='default' control={<Radio />} />
                                <Box>
                                    <Typography variant='h6' color='textPrimary'>{props.currentUser.fullname}</Typography>
                                    <Typography variant='body1' color='textSecondary'>{props.currentUser.address}</Typography>
                                    <Typography variant='body1' color='textSecondary'>{props.currentUser.email}</Typography>
                                    <Typography variant='body1' color='textSecondary'>{props.currentUser.phone}</Typography>
                                </Box>
                        </Box>

                        {
                            show && 
                            <>
                                <Box style={{display:'flex', alignItems: 'center', paddingLeft: '1.5rem', marginBottom: '1rem'}}>
                                    <FormControlLabel value='new' control={<Radio />} />
                                    <Typography variant='h6' color='textPrimary'>New Address</Typography>
                                </Box>
                                <Grid container spacing={2}>
                                    <Grid item sm={6} xs={12}>
                                        <TextField variant='outlined' fullWidth value={formInput.name} onChange={(e)=>dispatch({type:"NAME",payload: e.target.value})} label='Fullname'  />
                                    </Grid>
                                    <Grid item sm={6} xs={12}>
                                        <TextField variant='outlined' fullWidth value={formInput.email} onChange={(e)=>dispatch({type:"EMAIL",payload: e.target.value})} label='Email' />
                                    </Grid>
                                    <Grid item sm={6} xs={12}>
                                        <TextField variant='outlined' type={'number'} fullWidth value={formInput.phone} onChange={(e)=>dispatch({type:"PHONE",payload: e.target.value})} label='Phone' />
                                    </Grid>
                                    <Grid item sm={6} xs={12}>
                                        <TextField variant='outlined' fullWidth value={formInput.address} label='Address' onChange={(e)=>dispatch({type:"ADDRESS",payload: e.target.value})}/>
                                    </Grid>
                                    <Grid item sm={6} xs={12}>
                                        <TextField variant='outlined' fullWidth value={formInput.city} label='City' onChange={(e)=>dispatch({type:"CITY",payload: e.target.value})} />
                                    </Grid>
                                    <Grid item sm={6} xs={12}>
                                        <TextField variant='outlined' fullWidth label='Country' value={'Ghana'} />
                                    </Grid>
                                </Grid>
                            </>
                        }

                    </RadioGroup>

                    </CardContent>
                </Card>

                <Card variant='outlined' className={classes.card} style={{marginTop: '2rem'}}>
                    <CardContent>
                    <RadioGroup value={value} onChange={handleChange}>
                        <Grid container spacing={3}>
                            <Grid item sm={6} xs={12}>
                                <Box className={classes.delivery}>
                                    <FormControlLabel value='standard' control={<Radio />} />
                                    <Box>
                                        <Typography variant='h6' color='textPrimary'>Standard Delivery </Typography>
                                        <Typography variant='body2' color='textSecondary'>A flat delivery fee of Gh¢20 </Typography>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item sm={6} xs={12}>
                            <Box className={classes.delivery}>
                                    <FormControlLabel value='express' control={<Radio />} />
                                    <Box>
                                        <Typography variant='h6' color='textPrimary'>Express Delivery </Typography>
                                        <Typography variant='body2' color='textSecondary'>A flat delivery fee of Gh¢50 </Typography>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                        
                    </RadioGroup>
                    </CardContent>
                </Card>

                <Card variant='outlined' className={classes.card} style={{marginTop: '2rem'}}>
                    <CardContent className={classes.root}>
                        <Box style={{display:'flex', justifyContent: 'space-between'}}>
                            <span>
                                <Typography variant='h6' color='textPrimary'>WePay Card</Typography>
                                <Typography paragraph variant='body1' color='textSecondary'>We support Mastercard, Visa, Discover and Stripe</Typography>
                            </span>
                            <span>
                                <img src={MasterCard} alt="mastercard" />
                                <img src={VisaCard} alt="visacard" />
                            </span>
                        </Box>

                        <Grid container spacing={2}>
                            <Grid item sm={6}>
                                <TextField variant='outlined' value={formInput.cardName} onChange={(e)=> dispatch({type: "CARD_NAME", payload: e.target.value})} fullWidth label='Name on Card Account' />
                            </Grid>
                            <Grid item sm={6}>
                                <TextField fullWidth variant='outlined' type={'number'} label='Card Number' value={formInput.cardNumber} onChange={(e)=> dispatch({type: "CARD_NUMBER", payload: e.target.value})}/>
                               </Grid>
                            <Grid item sm={6}>
                                <TextField variant='outlined' select value={formInput.expiryMonth} onChange={(e)=> dispatch({type: "EXPIRY_MONTH", payload: e.target.value})} fullWidth label='Card Expiry Month' >
                                {months.map(el => {
                                    return (
                                      <MenuItem key={el} value={el} >{el}</MenuItem>
                                    )
                                  })}
                                </TextField>
                            </Grid>
                            <Grid item sm={6}>
                                <TextField variant='outlined' select value={formInput.expiryYear} onChange={(e)=>dispatch({type: "EXPIRY_YEAR", payload: e.target.value})} fullWidth label='Card Expiry Year' >
                                {years.map(el => {
                                    return (
                                      <MenuItem key={el} value={el} >{el}</MenuItem>
                                    )
                                  })}
                                </TextField>
                            </Grid>
                            <Grid item sm={6}>
                            <TextField variant='outlined' type={'number'} label='CVV' InputProps={{
                                endAdornment: <InputAdornment position='end'><img src={CVV} alt='cvv' /></InputAdornment>
                            }}
                            value={formInput.cvv} onChange={(e)=>dispatch({type: "CODE", payload: e.target.value})} fullWidth/>
                            </Grid>
                        </Grid>

                    </CardContent>
                </Card>
              </Grid>

              <Grid item sm={4}>
                <Card variant='outlined' className={classes.card}>
                    <CardHeader title='Order Summary' className={classes.caption} />
                    <CardContent>
                        <div className={classes.summary}>
                            <div className={classes.field}>
                                <Typography variant='body1' color='textSecondary' >SubTotal</Typography>
                                <Typography variant='body1'>Gh¢ {props.cart.total.toLocaleString()}</Typography>
                            </div>
                            <div className={classes.field} style={{marginTop: '.6rem'}}>
                                <Typography variant='body1' color='textSecondary' >Discount</Typography>
                                <Typography variant='body1'>Gh¢ ---</Typography>
                            </div>
                            <div className={classes.field} style={{marginTop: '.6rem'}}>
                                <Typography variant='body1' color='textSecondary' >Shipping (<span style={{fontSize: '.8rem', fontWeight: 500}}>{value}</span>)</Typography>
                                <Typography variant='body1'>Gh¢ {value === 'standard' ? '20' : '50'}</Typography>
                            </div>
                            <Divider style={{margin: '1rem 0 .8rem 0'}} />

                            <div className={classes.field} style={{margin: '.6rem 0'}}>
                                <Typography variant='body1' style={{fontWeight: 600}} >Total</Typography>                      
                                <Typography variant='body1' style={{fontWeight: 600}}>Gh¢ { value === 'standard' ? (props.cart.total + 20).toLocaleString() : (props.cart.total + 50).toLocaleString()}</Typography>
                            </div>

                            <Divider style={{margin: '1rem 0 .8rem 0'}} />
                            <FormControlLabel color='textSecondary' control={<Checkbox checked={check} onChange={onSelectHandle} /> } label='I agree to the WePayGh Card Policy' />

                            {/* DISCOUNT FIELD */}
                            <Box className={classes.root}>
                            <Button disabled={check ? false : true} variant='contained' disableElevation className={classes.checkout} fullWidth color='primary' onClick={onFormSubmit}>Place Order</Button>
                            </Box>


                        </div>
                    </CardContent>
                </Card>
              </Grid>
          </Grid>
      </Container>

      {/* SECURITY CHECK */}

      <Dialog open={secure} >
          <DialogTitle>Security Question</DialogTitle>
            <DialogContent style={{width: '30rem'}}>
                <TextField variant='outlined' error={security.err === '' ? false : true} value={security.ans} onChange={(e)=>setSecurity({ans: e.target.value, err: '' })} fullWidth label="Mother's Maiden Name" helperText={security.err} />
            </DialogContent>
          <DialogActions>
              <Button onClick={()=>securityCheck(security.ans)}>Answer</Button>
              <Button onClick={closeDialog}>Cancel</Button>
          </DialogActions>
      </Dialog>

      {/* POLICY ACCEPTANCE */}

      <Dialog open={open} onClose={closeDialog}>
          <DialogTitle>WePayGh Card Policy</DialogTitle>
            <DialogContent dividers>
                <CardPolicy />
            </DialogContent>
          <DialogActions>
              <Button onClick={policyCheck}>I agree</Button>
              <Button onClick={closeDialog}>I disagree</Button>
          </DialogActions>
      </Dialog>
    </>
  )
}

const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps, {removeFromCart, updateCart, newOrder})(Checkout)