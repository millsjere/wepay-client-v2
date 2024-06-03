import { Avatar, Box, Breadcrumbs, Button, Card, CardContent, CardHeader, Chip, Container, Divider, Grid, IconButton, InputAdornment, Link, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@material-ui/core'
import { grey } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/styles'
import { connect } from 'react-redux'
import React from 'react'
import { Delete } from '@material-ui/icons'
import { removeFromCart, updateCart } from '../../actions/actions'
import Modal from '../../components/Modal'
import EmptyCart from '../../assets/images/empty_cart.svg'



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
        background: theme.secondaryColorDark,
        color: '#fff',
        height: '2.2rem',
        padding: '0 .8rem',
        borderRadius: '.4rem',
        '&:hover': {
            background: theme.secondaryColorDark
        }

    }
}))


const Cart = (props) => {
    const classes = useStyles()


    const deleteCartItem = (id) => {
        props.removeFromCart(id)
    }

    const cartUpdateHandle = (e, id) =>{
        const data = {id: id, quantity: e.target.value}
        props.updateCart(data)
    }

  return (
    <>
    <Box className={classes.banner}>
    {/* Modal */}
    { props.modal && <Modal status={props.modal.status} /> }
        <Container>
          <Typography variant='h5'>Shopping Cart</Typography>
          <Breadcrumbs style={{justifyContent: 'center', alignItems: 'center', display: 'flex', marginTop:'1rem'}}>
            <Link href='/'>Home</Link>
            <Link href='/shop'>Shop</Link>
            <Typography>Cart</Typography>
          </Breadcrumbs>
        </Container>
      </Box>

      <Container>
          <Grid container spacing={3}>
              <Grid item sm={8}>
                <Card variant='outlined' className={classes.card}>
                <Box style={{display:'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <CardHeader title={`Cart (${props.cart ? props.cart.items.length : 0} items) `} className={classes.caption} />
                    <Button variant='contained' disableElevation className={classes.update}>Continue shopping</Button>
                </Box>
                    <Divider />
                    <CardContent>
                    { props.cart.items.length === 0 ? 

                        <Box style={{textAlign: 'center', padding: '1rem 0'}}>
                            <img src={EmptyCart} alt="empty-cart" />
                            <Typography variant='h6'>Cart is empty</Typography>
                            <Typography variant='body2' color='textSecondary'>Looks like you have no items in your shopping cart.</Typography>
                        </Box>
                        :
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Product Name</TableCell>
                                    <TableCell>Price</TableCell>
                                    <TableCell>Quantity</TableCell>
                                    <TableCell>Total</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            
                            { props.cart.items.map(item => {   
                                    let pay = null
                                    let url = `/shop/${item.product.category}/${item.product._id}`
                                    if(item.payment === 'oneMonth') {pay = 'Pay within a month'} 
                                    if(item.payment === 'threeMonths') {pay = 'Pay in 3 months'} 
                                    if(item.payment === 'sixMonths') {pay = 'Pay in 6 months'}        
                                    return (
                                        <TableRow key={item.id}>
                                            <TableCell size='small'>
                                            <Box style={{display: 'flex', gap: '1rem', alignItems: 'center', maxWidth:'18rem'}}>
                                                    <Avatar />
                                                    <Box style={{width: '15rem'}}>
                                                      <Link color='textPrimary' href={url}>  <Typography noWrap >{item.product.name}</Typography> </Link>
                                                        <Typography variant='body2' color='textSecondary'>{pay}</Typography>
                                                    </Box>
                                            </Box>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant='body1'>Gh¢{item.product.price[item.payment]}</Typography>
                                            </TableCell>
                                            <TableCell>
                                            <TextField type={'number'} variant='outlined' margin='dense' inputProps={{min: '1'}} defaultValue={item.quantity} style={{width:'4.5rem'}} onChange={(e)=>cartUpdateHandle(e, item.id)} />
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant='body1'>Gh¢{item.total} </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <IconButton onClick={()=>{deleteCartItem(item.id)}} ><Delete fontSize='small' style={{color: 'red'}}/></IconButton>
                                            </TableCell>
                                        </TableRow>
                                    )
                                }) 
                            }
                                
                            </TableBody>
                        </Table>
                    }
                    </CardContent>
                </Card>
              </Grid>

              <Grid item sm={4}>
                <Card variant='outlined' className={classes.card}>
                    <CardHeader title='Order Summary' className={classes.caption} />
                    <Divider />
                    <CardContent>
                        <div className={classes.summary}>
                            <div className={classes.field}>
                                <Typography variant='body1' color='textSecondary' >SubTotal</Typography>
                                <Typography variant='body1'>Gh¢ {props.cart.total.toLocaleString()}</Typography>
                            </div>
                            <div className={classes.field} style={{marginTop: '.6rem'}}>
                                <Typography variant='body1' color='textSecondary' >Discount</Typography>
                                <Typography variant='body1'> ---</Typography>
                            </div>
                            <div className={classes.field} style={{marginTop: '.6rem'}}>
                                <Typography variant='body1' color='textSecondary' >Shipping</Typography>
                                <Typography variant='body1'>---</Typography>
                            </div>
                            <Divider style={{margin: '1rem 0 .8rem 0'}} />

                            <div className={classes.field} style={{margin: '.6rem 0'}}>
                                <Typography variant='body1' style={{fontWeight: 600}} >Total</Typography>                      
                                <Typography variant='body1' style={{fontWeight: 600}}>Gh¢ {props.cart.total.toLocaleString()}</Typography>
                            </div>

                            {/* DISCOUNT FIELD */}
                            <Box className={classes.root}>
                            <TextField style={{marginTop: '1rem', borderRadius: '1rem'}} fullWidth label='Discount' variant='outlined' InputProps={{endAdornment: <InputAdornment position='end'><Chip label='Apply' onClick={()=>{}} /></InputAdornment>}} />
                            <Button disabled={props.cart.items.length === 0 ? true : false} variant='contained' disableElevation className={classes.checkout} fullWidth color='primary' href={'/checkout'}>Checkout</Button>
                            </Box>


                        </div>
                    </CardContent>
                </Card>
              </Grid>
          </Grid>
      </Container>
    </>
  )
}

const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps, {removeFromCart, updateCart})(Cart)