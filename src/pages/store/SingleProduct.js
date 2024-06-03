import { Box, Breadcrumbs, Container, Typography, Link, Grid, Divider, TextField, MenuItem, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useReducer, useState } from 'react';
import Rating from '@material-ui/lab/Rating';
import { LocalMall } from '@material-ui/icons';
import { useLocation } from 'react-router-dom';
import {connect} from 'react-redux'
import ProductItem from '../../components/ProductItem'
import { getOneProduct, addToCart } from '../../actions/actions';
import Modal from '../../components/Modal'
import Loader from '../../components/Loader';



const useStyles = makeStyles(theme => ({
    header: {
        background: theme.secondaryColorDark
    },
    bcrumbs : {
        padding: '1.5rem 0 1.5rem 0',
        borderBottom: '1px solid lightgrey',
    },
    productImage : {
        border: '1px solid lightgrey',
        padding: '1rem'
    },
    title : {
        fontWeight: 500,
    },
    price: {
        fontSize: '1.4rem',
        marginBottom: '.5rem'
    },
    productContent: {
    
    },
    addToCart: {
        color: '#fff'
    },
    payment : {
        margin: '1rem 0',
        alignItems: 'center',
        '& h6': {
            marginLeft: '1rem'
        }
    },
    tags: {
        marginBottom: '.5rem'
    }
}))
const SingleProduct = (props) => {
    const {currentUser} = props
    const classes = useStyles()
    const [payment, SetPayment] = useState('')
    const [disable, setDisable] = useState(true)
    const payOptions = ['Pay within a month', 'Pay in 3 months', 'Pay in 6 months']

    const path = useLocation();
    const id = path.pathname.split('/')[3]

    const reducerFn = (state, action) => {
        switch (action.type) {
            case "QTY":
                return {...state, quantity: action.payload}
            case "PAYMENT":
                return {...state, paymentOption: action.payload}
            default:
                return {product: '', quantity: '1', paymentOption: '' };
        }
    }

    const[cart, dispatch] = useReducer(reducerFn,{quantity: '1', paymentOption: '' })

    const onPaymentSelect = (e) => {
        SetPayment(e.target.value)
        dispatch({type:"PAYMENT", payload: e.target.value})
        setDisable(false)
    }

    const addToCart = (id)=> {
        if(!currentUser){
            //console.log(window.location)
            const url = encodeURIComponent(window.location.href)
            window.location.assign(`/auth/login/?return=${url}`)
        }else{
            const data = {
                product: id,
                quantity: cart.quantity,
                paymentOption: cart.paymentOption
            }
            props.addToCart(data)

        }
        
    }

const renderPage = (product) => {

    return (
        <>
        {/* Modal  */}
        {props.modal ? <Modal status={props.modal.status} /> : null}
            <Box className={classes.bcrumbs}>
                <Container>
                    <Breadcrumbs seperator='-'>
                        <Link href='/'>Home</Link>
                        <Link href='/'>Shop</Link>
                        <Link href='/'>{product.category}</Link>
                        <Typography color='textSecondary'>{product.name}</Typography>
                    </Breadcrumbs>
                </Container>
            </Box>

        <Container>
        <Grid container spacing={6} style={{marginTop: '4rem'}}>
        
            <Grid item sm={6}> 
                <Box className={classes.productImage}>
                    <img src={product.images[0]} width={'100%'} alt="product" />
                </Box> 

            </Grid>
            
            <Grid item sm={6} className={classes.productContent}>
                <Typography className={classes.title} variant='h4' gutterBottom> {product.name} </Typography>
                <Typography variant='h5' className={classes.price}> {`Gh¢ ${product.price.oneMonth} - Gh¢ ${product.price.sixMonths * 6}`} </Typography>

                <Box style={{display: 'flex', gap: '2rem', alignItems:'center', marginBottom: '1rem'}}>
                    <Rating size="small" readOnly defaultValue={4} />
                    <Typography variant='body1'>Status: <span style={{color: 'orange'}}>{product.instock ? 'In-stock' : 'Out of stock'}</span></Typography>
                </Box>

                <Divider />

                <Typography variant='body1' color='textSecondary' style={{margin: '1.5rem 0 2rem 0'}}>
                    {product.description}
                </Typography>

                <Grid container className={classes.payment}>
                    <Grid item sm={6}>
                        <TextField select variant='outlined' label='Choose a payment option' fullWidth value={payment} onChange={(e)=> onPaymentSelect(e)} >
                            { payOptions.map((opt, index) => {
                                if(index === 0){ return (<MenuItem key={opt} value={'oneMonth'}>{opt}</MenuItem>)}
                                if(index === 1){ return (<MenuItem key={opt} value={'threeMonths'}>{opt}</MenuItem>)}
                                if(index === 2){ return (<MenuItem key={opt} value={'sixMonths'}>{opt}</MenuItem>)}  
                                return null   
                            })
                            }
                            
                        </TextField>
                        
                    </Grid>
                    <Grid item sm={6}>
                    <Typography variant='h6' component='h6'> {payment === '' ? null : `Ghc${product.price[payment].toLocaleString()}`}</Typography>
                    </Grid>
                </Grid>

                <Box style={{display: 'flex', gap: '1rem', marginBottom: '2rem'}}>
                    <TextField variant='outlined' type='number' defaultValue={'1'} inputProps={{min: 1}} label='Qty' style={{width:'6rem'}} onChange={(e) => dispatch({type:"QTY", payload: e.target.value})} />
                    <Button size='large' disabled={disable} onClick={()=> addToCart(product.id)}
                    className={classes.addToCart} startIcon={<LocalMall />} variant='contained' 
                    disableElevation fullWidth color="primary" >ADD TO CART</Button>
                </Box>

                <Divider style={{marginBottom: '1rem'}}/>
                <Typography variant='body1' className={classes.tags}>Category: <span style={{color: 'orange'}}>{product.category}</span></Typography>
                <Typography variant='body1' className={classes.tags}>SKU: <span style={{color: 'orange'}}>{product.sku}</span></Typography>
                <Typography variant='body1' className={classes.tags}>Tags:  
                    {
                        product.tags.map((tag) => {
                            return ( <span key={tag} style={{color: 'orange'}}> {tag}</span>)
                        })
                    }
                </Typography>

            </Grid>
        </Grid>

        <Typography variant='h5' style={{margin: '5rem 0 1.5rem 0', fontWeight: 500}}>Related Products</Typography>
        <Grid container spacing={3}>
            { props.products.filter((prod) => prod.category === product.category).slice(0,4).map((item) => {
                return (
                    <Grid item key={item.id} sm={3}>
                        <ProductItem name={item.name} price={item.price} image={item.images[0]} id={item.id} />
                    </Grid>
                )
            })}
        </Grid>
            
        </Container>
        </>
    )
}

  return (
    
     <>
     { props.products.length === 0 ?
      <Loader /> : 
      props.products.filter(item => item.id === id).map(product => {
         return <div key={product.id}>{renderPage(product)}</div>
        }) 
     }</> 
   
  )
};

const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps, {getOneProduct, addToCart})(SingleProduct);
