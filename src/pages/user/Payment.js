import { Search, CreditCard } from '@material-ui/icons';
import { Avatar, Card, Box, CardContent, Chip, Grid, InputAdornment, TextField, Typography } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid'
import React,  {useState} from 'react';
import { makeStyles } from '@material-ui/styles';
import PageHeader from './dashboard/PageHeader'
import Wallet from '../../assets/images/wallet.png'
import { getUserCard } from '../../actions/actions';
import { connect } from 'react-redux';


const useStyles = makeStyles( theme => ({
  root : {
    '& .MuiOutlinedInput-root': {
      borderRadius: '10px',
      "&.Mui-focused fieldset": {
        border: `1px solid ${theme.backgroundPrimary}`
      }
    }
  },
  addBtn: {
    marginLeft: 'auto',
    height: '45px',
    color: '#fff',
    background: theme.primaryColorOrange,
    padding: '0 15px',
    borderRadius: '10px',
    '&:hover' : {
      background: theme.secondaryColorDark
    }
  },
  title : {
    fontSize: '1.8rem',
    fontWeight: 700
  },
  large : {
    width: theme.spacing(6),
    height: theme.spacing(6),
    background: theme.primaryColorOrange,
    borderRadius: '10px',
    marginBottom: '1rem',
    color: '#fff'
  }, 
  card : {
    background: theme.secondaryColorDark,
    '& h6, p': {
      color: '#fff'
    }
  }

}))


const Payment = (props) => {
  const {user, getUserCard} = props
  const classes = useStyles()
  const [pageSize, setPageSize] = useState(5)

  React.useEffect(() => {
    if(user.status === 'Approved'){
      getUserCard();
    }
  },[getUserCard, user])


  const columns = [
    {field: 'userID', headerName: 'Customer Name', flex: 1, renderCell: (params) => `${props.user.fullname}` }, 
    {field: 'createdAt', headerName: 'Date of Payment', flex: 1, renderCell: (params) => `${new Date(params.value).toDateString()} at ${new Date(params.value).toLocaleTimeString()}` }, 
    {field: 'amount', headerName: 'Amount Paid', flex: 1, renderCell: (params) => { return `GH¢ ${params.value}.00`} },
    {field: 'status', headerName:' Status', flex: 1, renderCell: (params) => { return <Chip disabled label={params.value} />} },
  ]


  const renderPage = () => {
    if(props.user.loan.length !== 0 && props.user.loan[0].amount){
      return <>
        <Grid container spacing={2}>

          <Grid item xs={12} sm={12} md={6} lg={3}>
            <Card className={classes.card} variant='outlined' style={{borderRadius: '10px'}}>
              <CardContent style={{padding: '2rem', position: 'relative'}}>
                <Avatar className={classes.large}><CreditCard /></Avatar>
                <Typography variant='h6' className={classes.title}>{ props.user.loan.length === 0 ? 'GH¢ 0.00' : `GH¢ ${props.user.loan[0].amount - props.payment.total}`}</Typography>
                <Typography variant='body2' color='textSecondary'>{ props.user.loan[0].status === 'Pending' ? 'Requested' : 'Outstanding'} Loan</Typography>
                <Chip label={props.user.loan[0].status} style={{position: 'absolute', top: '20%', right: '7%'}} color='primary' />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={3}>
            <Card className={classes.card} variant='outlined' style={{borderRadius: '10px'}}>
              <CardContent style={{padding: '2rem'}}>
              <Avatar className={classes.large}><CreditCard /></Avatar>
                <Typography variant='h6' className={classes.title}> { props.card.amount ? `GH¢ ${props.card.amount}` : 'GH¢ 0.00'}</Typography>
                <Typography variant='body2' color='textSecondary'>Available Card Balance</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={3}>
            <Card className={classes.card} variant='outlined' style={{borderRadius: '10px'}}>
              <CardContent style={{padding: '2rem'}}>
              <Avatar className={classes.large}><CreditCard /></Avatar>
                <Typography variant='h6' className={classes.title}>{ props.user.loan.length === 0 ? 'GH¢ 0.00' : `GH¢ ${props.user.loan[0].perMonth.toLocaleString()}` } </Typography>
                <Typography variant='body2' color='textSecondary'>Payment Per Month</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={3}>
            <Card className={classes.card} variant='outlined' style={{borderRadius: '10px'}}>
              <CardContent style={{padding: '2rem'}}>
              <Avatar className={classes.large}><CreditCard /></Avatar>
                <Typography variant='h6' className={classes.title}>{`GH¢ ${props.payment.total.toLocaleString()}`}</Typography>
                <Typography variant='body2' color='textSecondary'>Loan Paid</Typography>
              </CardContent>
            </Card>
          </Grid>

          </Grid>

          <Card variant='outlined' style={{ borderRadius: '10px', width: '100%', marginTop: '2rem'}} className={classes.root}>

          <CardContent style={{ padding:'30px' }}>
              <Box marginBottom={'1rem'}>
                <Typography variant='h5'>Payments</Typography>
              </Box>
              <TextField  variant='outlined' style={{ marginBottom: '20px'}}
              placeholder='Find a payment' fullWidth
              InputProps={{ 
                startAdornment: <InputAdornment position='start'><Search fontSize='small' /> </InputAdornment>
                }}/>
              <DataGrid autoHeight 
                pagination rows={props.payment.items.filter(pay => pay.status === 'confirmed')} rowsPerPageOptions={[5, 10, 15, 20]}
                rowHeight={70} columns={columns} 
                pageSize={pageSize} checkboxSelection 
                onPageSizeChange={(newSize)=> setPageSize(newSize)}
                />

          </CardContent>
          </Card>
      </>
    }
    return <>
      <Box padding={'3rem'} textAlign='center'>
        <img src={Wallet} width='25%' alt='wallet' style={{marginBottom: '1rem'}} />
        <Typography variant='h6' gutterBottom>Looks like your wallet is empty</Typography>
        <Typography color='textSecondary' gutterBottom>Complete your account status and get verified to be eligible for a LOAN</Typography>
        {/* <Hidden xsUp>
          <Button variant='contained' color='secondary'>GET A LOAN</Button>
        </Hidden> */}
      </Box>
    </>
  }

  return (
    <>
      <PageHeader title={'Loan & Payments'} link2={'payment'} user={props.user} />

      {renderPage()}
      
    </>
  )
};

const mapStateToProps = (state) => {
 //console.log(state)
  return state
}


export default connect(mapStateToProps, {getUserCard})(Payment)
