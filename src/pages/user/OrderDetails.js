import { Avatar, Box, Card, CardContent, CardHeader, Divider, Grid, Link, makeStyles, Tab, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { ListAlt, LocalShipping, Receipt } from '@material-ui/icons';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import React from 'react';
import PageHeader from './dashboard/PageHeader';
import Loader from '../../components/Loader'





const useStyles = makeStyles(theme => ({
    root: {
    '& .PrivateTabIndicator-root-16': {
        background: theme.primaryColorOrange
    },
    '& .MuiGrid-item' : {
        padding: '1.8rem'
    }
    },
    card: {
        '&:hover': {
            boxShadow: 'rgb(32 40 45 / 8%) 0px 2px 14px 0px'
        }
    },
    cardTitle : {
        '& span': {
            fontSize : '1.1rem'
        }
    },
    subtitle : {
        fontSize: '1.2rem',
        fontWeight: 600,
        marginBottom: '1rem'
    },
    wrap : {
        borderTop: `1px solid ${grey[300]}`,
        '& span' : {
            margin: '0 .8rem',
            color: grey[600]
        }
    }

}))



const OrderDetails = (props) => {
    const classes = useStyles()
    const [value, setValue] = React.useState('1');
    

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    

    const renderPage = () => {
        if(props.orders.length > 0) {
            const order = props.orders && props.orders.filter(element => element.id === props.id)
            return <>
            <PageHeader title={'Order Details - #230893'} link1={'orders'} link2={'details'} />
            <Card variant='outlined' className={classes.root}>
            <CardContent className={classes.tabWrap}>
                <TabContext value={value}>
                    <TabList onChange={handleChange} >
                        <Tab label='Details' icon={<ListAlt />} value='1'/>
                        <Tab label='Invoice' icon={<Receipt/>} value='2' />
                        <Tab label='Tracking' disabled icon={<LocalShipping /> } value='3' />
                    </TabList>
                    <Divider />

                    {/* PANEL ONE */}
                    <TabPanel value='1' index={0}>
                        <Card variant='outlined' className={classes.card}>
                            <CardHeader title='Customer' component='p' className={classes.cardTitle} />
                            <Divider />
                            <CardContent>

                                <Grid container spacing={3}>
                                    <Grid item sm={12}>
                                        <Typography variant='body1'> <b>Name : </b> {props.user.fullname}</Typography>
                                        <Typography variant='body1' > <b>Phone : </b> +233 {props.user.phone}</Typography>
                                        <Typography variant='body1' > <b>Email : </b> {props.user.email}</Typography>
                                    </Grid>
                                    
                                    <Grid item sm={6} className={classes.wrap}>
                                        <Typography variant='body1' gutterBottom className={classes.subtitle} >Payment Method</Typography>
                                        <Typography paragraph variant='body2' > Card Type: <span>WePay Card</span> </Typography>
                                        <Typography paragraph variant='body2' > Transaction ID : <span>{order[0].transactionID}</span></Typography>
                                        <Typography paragraph variant='body2' > Amount : <span>GH¢ {order[0].total}</span></Typography>
                                    </Grid>
                                    <Grid item sm={6} className={classes.wrap}>
                                        <Typography variant='body1' className={classes.subtitle} >Order Status</Typography>
                                        <Typography paragraph variant='body2' > Fulfillment Status : <span> Delivered</span></Typography>
                                        <Typography paragraph variant='body2' > Date : <span>{new Date(order[0].createdAt).toDateString()} at {new Date(order[0].createdAt).toLocaleTimeString()}</span></Typography>
                                        <Typography paragraph variant='body2' > Payment Status : <span>Fully paid</span></Typography>
                                    </Grid>
                                    <Grid item sm={6} className={classes.wrap}>
                                        <Typography variant='body1' gutterBottom className={classes.subtitle} >Billing Address</Typography>
                                        <Typography paragraph variant='body2' > Fullname : <span>{props.user.fullname}</span> </Typography>
                                        <Typography paragraph variant='body2' > Address : <span>{props.user.address}</span></Typography>
                                        <Typography paragraph variant='body2' > City : <span>Accra</span></Typography>
                                        <Typography paragraph variant='body2' > Phone : <span>+233 {props.user.phone}</span></Typography>
                                    </Grid>
                                    <Grid item sm={6} className={classes.wrap}>
                                        <Typography variant='body1' gutterBottom className={classes.subtitle} >Shipping Address</Typography>
                                        <Typography paragraph variant='body2' > Fullname : <span>{order[0].shipping.name}</span> </Typography>
                                        <Typography paragraph variant='body2' > Address : <span>{order[0].shipping.address}</span></Typography>
                                        <Typography paragraph variant='body2' > City : <span>Accra</span></Typography>
                                        <Typography paragraph variant='body2' > Phone : <span>+233 {order[0].shipping.phone}</span></Typography>
                                    </Grid>
                                </Grid>

                            </CardContent>
                        </Card>

                        <Card variant='outlined' style={{marginTop: '2rem'}} className={classes.card}>
                            <CardHeader title='Products' component='p' className={classes.cardTitle} />
                            <CardContent>

                                    <Table >
                                          <TableHead>
                                              <TableRow>
                                                  <TableCell><Typography>Product Name</Typography></TableCell>
                                                  <TableCell><Typography>Unit Price</Typography></TableCell>
                                                  <TableCell align='center'><Typography>Quantity</Typography></TableCell>
                                                  <TableCell ><Typography>Total</Typography></TableCell>
                                                 
                                              </TableRow>
                                          </TableHead>
                                          <TableBody>
                                          
                                          { order[0].cart.map(item => {   
                                                  let pay = null
                                                  if(item.payment === 'oneMonth') {pay = 'Pay within a month'} 
                                                  if(item.payment === 'threeMonths') {pay = 'Pay in 3 months'} 
                                                  if(item.payment === 'sixMonths') {pay = 'Pay in 6 months'}        
                                                  return (
                                                      <TableRow key={item.id} >
                                                          <TableCell>
                                                          <Box style={{display: 'flex', gap: '1rem', alignItems: 'center', maxWidth:'18rem', padding: '.5rem 0'}}>
                                                                  <Avatar className={classes.large} src={item.product.images[0]} />
                                                                  <Box style={{width: '15rem'}}>
                                                                    <Link color='textPrimary'>  <Typography noWrap >{item.product.name}</Typography> </Link>
                                                                      <Typography variant='body2' color='textSecondary'>{pay}</Typography>
                                                                  </Box>
                                                          </Box>
                                                          </TableCell>
                                                          <TableCell>
                                                              <Typography variant='body1'>Gh¢{item.product.price[item.payment]}</Typography>
                                                          </TableCell>
                                                          <TableCell align='center'>
                                                              <Typography variant='body1'>{item.quantity}</Typography>
                                                          </TableCell>
                                                          <TableCell>
                                                              <Typography variant='body1'>Gh¢{item.total} </Typography>
                                                          </TableCell>
                                                         
                                                      </TableRow>
                                                  )
                                              }) 
                                          }
                                              
                                          </TableBody>
                                      </Table>

                            </CardContent>
                        </Card>
                    </TabPanel>

                    <TabPanel value='2' index={1}>
                        Item Two
                    </TabPanel>
                    <TabPanel value='3' index={2}>
                        Item Three
                    </TabPanel>

                </TabContext>

            </CardContent>
        </Card>
            </>
        }

        return <Loader />

    } 

  return (
      <>
        {renderPage()}
      </>
  )
};

export default OrderDetails;
