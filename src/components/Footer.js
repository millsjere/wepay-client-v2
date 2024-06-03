import { alpha, Box, Button, Container, Divider, Grid, Link, List, ListItem, ListItemIcon, ListItemText, TextField, Typography } from '@material-ui/core';
import { Facebook, Instagram, KeyboardArrowRight, Twitter } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import Logo from '../assets/images/logo.png'

const useStyles = makeStyles(theme => ({
    newsletter: {
        background: '#f9f9f9',
        marginTop: '5rem',
        padding: '2.5rem 0',
        borderTop: '1px solid lightgrey',
        borderBottom: '1px solid lightgrey',
        '& h6': {
            fontSize: '1.7rem'
        }
    },
    footer : {
        background: '#24324d',
        padding: '5rem 0 2rem 0'
    },
    text: {
        color: alpha('#fff', 0.5),
    },
    divide: {
        background: alpha('#fff', 0.2),
        marginTop: '3rem'
    },
    icon : {
        color: alpha('#fff', 0.5),
        minWidth: '30px'
    },

    title : {
        color: '#fff',
        marginLeft: '1rem'
    },
    foot : {
        background: '#24324d',
    }
}))
const Footer = () => {
    const classes = useStyles()

    const quickLinks = [
        {name: 'Partner Stores', link: '/stores'},
        {name: 'Support', link: '/contact'},
        {name: 'FAQs', link: '/contact'},
        {name: 'Forgot Password', link: '/auth/forgotpassword'}
    ]
    const resourceLinks = [
        {name: 'Login', link: '/auth/login'},
        {name: 'Register', link: '/auth/register'},
        {name: 'Privacy Policy', link: '/policy'},
        {name: 'WePay Card Policy', link: '/cardpolicy'},
    ]

  return (
    <div>
        {/* NEWSLETTER */}
        <Box className={classes.newsletter}>
            <Container >
                <Grid container style={{alignItems:'center'}}>
                    <Grid item sm={6}>
                        <Typography component='h6' variant='h6' >Newsletter</Typography>
                        <Typography paragraph color='textSecondary'>Subcribe to get information about products and offers</Typography>
                    </Grid>
                    <Grid item sm={6}>
                    <form style={{display:'flex'}}>
                        <TextField placeholder='Email address' variant='outlined' fullWidth/>
                        <Button variant='contained' color='primary' disableElevation style={{padding: '0 4rem', marginLeft: '1rem'}} >Subscribe</Button>
                    </form>

                    </Grid>
                </Grid>
            </Container>
        </Box>

        {/* FOOTER */}
        <Box className={classes.footer}>
            <Container>
            <Grid container spacing={3}>
                <Grid item sm={4}>
                    <Link href='/'><img src={Logo} width={'50%'} alt='logo' style={{marginBottom: '1rem'}} /></Link>
                    <Typography className={classes.text}>
                        Wepay offers a complete stack for all your payments needs across channels such as ecommerce stores, business subscription, to platforms and marketplaces    
                    </Typography>
 
                </Grid>

                <Grid item sm={3}>
                    <Typography variant='h6' className={classes.title}> Quick Links</Typography>
                    <List>
                        {quickLinks.map(link => {
                            return (
                            <ListItem key={link.name}>
                                <ListItemIcon className={classes.icon}><KeyboardArrowRight /></ListItemIcon>
                                <Link href={link.link}><Typography variant='body1'>{link.name}</Typography></Link>
                            </ListItem>

                            )
                        })
                        }
                    </List>

                </Grid>
                <Grid item sm={3}>
                    <Typography variant='h6' className={classes.title}>Resources </Typography>
                    <List >
                        {resourceLinks.map(link => {
                            return (
                            <ListItem key={link.name}>
                                <ListItemIcon className={classes.icon}><KeyboardArrowRight /></ListItemIcon>
                                <Link href={link.link}><Typography variant='body1'>{link.name}</Typography></Link>
                            </ListItem>

                            )
                        })
                        }
                    </List>

                </Grid>
                <Grid item sm={2}>
                    <Typography variant='h6' className={classes.title}>Connect with us </Typography>
                    <List>
                        <Link href="https://www.facebook.com/WePaygh-101634715707614">
                            <ListItem>
                                <ListItemIcon className={classes.icon}><Facebook /></ListItemIcon>
                                <ListItemText primary='Facebook' />
                            </ListItem>
                        </Link>
                        <Link href='https://www.instagram.com/wepaygh/'>
                            <ListItem>
                                <ListItemIcon className={classes.icon}><Instagram /></ListItemIcon>
                                <ListItemText primary='Instagram' />
                            </ListItem>
                        </Link>
                        <Link href='https://twitter.com/wepaygh'>
                            <ListItem>
                                <ListItemIcon className={classes.icon}><Twitter /></ListItemIcon>
                                <ListItemText primary='Twitter' />
                            </ListItem>
                        </Link>
                        
                    </List>
                </Grid>

            </Grid>

            <Divider className={classes.divide}/>
            <Typography variant='body1' style={{textAlign:'center', color: '#ffffff52', marginTop: '1rem'}}> © 2022 WePayGh. Powered by Forbes Micro Finance.</Typography>

            </Container>
        </Box>

    </div>
  )
};

export default Footer;
