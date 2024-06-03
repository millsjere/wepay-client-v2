import { Box, Button, Container, Grid, Hidden, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import 'animate.css'


const useStyles = makeStyles(theme => ({
    wrapper : {
        padding: '2rem 2rem 4rem 2rem',
        display: 'flex'
    },
    boxLeft : {
        flex: 6,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        [theme.breakpoints.down('md')]:{
            padding: '2rem'
        },
        [theme.breakpoints.down('xs')]:{
            padding: '0'
        },
        '& span':{
            width: '100%',
            [theme.breakpoints.down('md')]:{
                textAlign: 'center'
            }
        }
    },
    boxRight : {
        position: 'relative',
        flex : 6,
        textAlign: 'center'
    },
    title : {
        fontWeight: 600,
        color: '#fff',
        lineHeight: 1,
        width: '100%',

        [theme.breakpoints.down('md')]:{
            fontSize: '2.5rem',
            textAlign: 'center'
        },
        [theme.breakpoints.down('xs')]:{
            fontSize: '1.8rem',
            textAlign: 'center'
        }
    },
    para : {
        marginBottom: '2.5rem',
        color: '#fff',
        lineHeight: 1.6,
        [theme.breakpoints.down('md')]:{
            textAlign: 'center'
        }
    },
    cards : {
        width: '80%',
        position: 'absolute',
        top: '-4%',
        right: '20%'
    }
}))


const Banner = () => {
    const classes = useStyles()
 

  return (
    <Container className={classes.wrapper}>
    <Grid container spacing={4}>
        <Grid item sm={19} md={6} lg={6} style={{display:'flex', alignItems: 'center'}}>
            <Box className={`${classes.boxLeft} animate__animated animate__fadeInLeft`}>
                <Typography className={classes.title} variant='h2' gutterBottom> You Can Do more <br/>with WePay Card </Typography>
                <Typography className={classes.para} paragraph> You buy and WePay. WePay enables you to access creditcard through our partner banks. Credit card services include hire-purchase, direct utility payments POS(Point of Sales) services and cash withdrawals from ATMs. </Typography>
                <span >
                <Button size='large' color='primary' variant='contained' href={'/auth/register'} style={{marginRight: '1rem'}} >Get Started</Button>
                <Button size='large' variant='contained' href={'/auth/register'} >How It Works</Button>
                </span>
            </Box>
        </Grid>

        <Hidden smDown  >
            <Grid item sm={6} md={6} lg={6}>
                <Box className={classes.boxRight}>
                    <img style={{width: '80%', backgroundPosition:'center', opacity: '0.5'}} src='./images/radial.png' alt='banner-radial' />
                    <img className={classes.cards} src='./images/Credit_Card.png' alt='banner-radial' />
                </Box>
            </Grid>
        </Hidden>
    </Grid>
            
    </Container>
  )
};

export default Banner;
