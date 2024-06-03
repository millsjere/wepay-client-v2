import { Avatar, Box, Button, Card, CardContent, Container, Grid, Hidden, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@material-ui/core';
import { AccountBalance, AttachMoney, Check, LocalMall, Payment } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import Banner from '../components/Banner';
import { connect } from 'react-redux';
import { grey } from '@material-ui/core/colors';
import 'animate.css'
import Features from '../components/Features';
import OwlCarousel from 'react-owl-carousel'


const useStyles = makeStyles(theme => ({
  header : {
    background: theme.secondaryColorDark,
    height: '100%',
  },
  wrap : {
   display: 'flex'
  },
  section : {
    padding: '6rem 0',
  },
  title : {
    fontSize: '2.2rem',
    fontWeight: 600,
    lineHeight: 1.2,
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.8rem',
      textAlign: 'center',

    }
  },
  subtitle: {
    fontWeight: 600,
    fontSize: "2rem",
    color: '#fff'
  },
  text : {
    marginBottom: '2.5rem',
    textAlign: 'center'
  },
  icons : {
    fontSize: '2rem',
    color: grey[500],
    padding: '2rem',
    marginBottom: '1rem',
    background: grey[200],
    borderRadius: '50px'
  },
  boxLeft: {
    display: 'flex',
    flexDirection: 'column',
    flex: '6', 
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  boxRight: {
    flex: '6',
    padding: '2.5rem'
  },
  productBanner: {
    flex: 3,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  productList: {
    flex: 9,
    boxShadow: '0 2px 2rem rgba(0,0,0, 12%)',
    padding: '2rem 3rem'
  },
  productHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
    '& h5': {
      fontWeight: 500,
      fontSize: '1.8rem'
    }
  },
  divider : {
    margin: '5rem 0',
    padding: '3rem 0',
    background: "#1a91bd",
    '& h4': {
      color: '#fff',
      fontSize: '2.8rem',
      fontWeight: 600,
      marginBottom: '1rem',
      [theme.breakpoints.down('md')]: {
        fontSize: '2rem',
        textAlign: 'center',

      }
    },
    '& p': {
      color: '#fff'
    }
  },
  features: {
    border: 'none',
    textAlign: 'center',
    borderRadius: '0',
    padding: '.5rem'
  },
  icon: {
    fontSize: '2.2rem',
  },
  avatarIcon: {
    background: theme.primaryColorOrange
  },
  phone: {
    marginTop: '-7rem'
  },
  shop: {
    display:'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'flex-start',
    [theme.breakpoints.down('md')]: {
      padding: '3rem',
      alignItems: 'center'
    }
  }

}))

const Home = (props) => {

  console.log(props)
  const classes = useStyles()

  const features = [
    {title: 'Access Loan', icon: <AttachMoney className={classes.icon} /> , copy: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Exercitationem atque sint asperiores labore hic ad dolor adipisci amet." },
    {title: 'Payment', icon: <Payment className={classes.icon} />, copy: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Exercitationem atque sint asperiores labore hic ad dolor adipisci amet." },
    {title: 'E-Wallet', icon: <AccountBalance className={classes.icon} />, copy: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Exercitationem atque sint asperiores labore hic ad dolor adipisci amet." },
    {title: 'Shop',icon: <LocalMall className={classes.icon} />, copy: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Exercitationem atque sint asperiores labore hic ad dolor adipisci amet." }
  ]

  const benefits = [
    {title: 'Online Transactions', icon: <Check />},
    {title: 'Easy Access & Control', icon: <Check />},
    {title: 'Guaranteed Safety', icon: <Check />},
    {title: 'ATM Withdrawals', icon: <Check />},
    {title: '100% Trusted', icon: <Check />},
    {title: 'Online Shopping', icon: <Check />}
  ]


  return (
    <div className={`animate__animated animate__fadeIn`}>
    <header className={classes.header}>
        <Banner />
        <Box bgcolor='#1a91bd'>
          <Container>
            <Grid container style={{alignItems: 'center', height: '9rem'}}>
              <Grid item xs={12} md={6} lg={6} className={classes.wrap}>
                <Grid item xs={4} sm={4} style={{textAlign: 'center'}}>
                  <Typography  variant='h6' className={classes.subtitle} >16K +</Typography>
                  <Typography style={{color:'#fff'}} >Active Users</Typography>
                </Grid>
                <Grid item xs={4} sm={4} style={{textAlign: 'center'}}>
                  <Typography  variant='h6' className={classes.subtitle} >4K +</Typography>
                  <Typography style={{color:'#fff'}}>Good Reviews</Typography>
                </Grid>
                <Grid item xs={4} sm={4} style={{textAlign: 'center'}}>
                  <Typography variant='h6' className={classes.subtitle} >100%</Typography>
                  <Typography style={{color:'#fff'}}>Secure System </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </Box>
    </header>

    <Container style={{position: 'relative', zIndex: 2, background: '#fff'}}>
      <Box className={classes.section}>
              <Typography variant='h4' className={classes.title} gutterBottom >The Right Choice</Typography>
              <Typography variant='body1' className={classes.text} color='textSecondary'>With WePay, you are guaranteed convenience, speed and a reliable service.</Typography>
      
          <Box>
              <OwlCarousel items={4} autoplaySpeed={1500} margin={20} loop={true}
                  nav={false} navElement="div" navText={[`<i class='fas fa-arrow-left'></i>`, `<i class='fas fa-arrow-right'></i>`]}
                  responsive={ { 1400 : {items : '4'}, 1200 : {items : '4'}, 768 : {items : '3'}, 540 : {items : '2'}, 340 : {items : '1'} } }
                > 
                    { 
                      features.map(item => {
                        return (
                          <Features key={item.title} title={item.title} copy={item.copy} icon={item.icon} />
                        )
                    })
                    }
                  </OwlCarousel>
          </Box>
      
      </Box>

      <Box >
        <Grid container spacing={4}>
          <Grid item lg={6} md={12}>
                <Typography variant='h4' gutterBottom className={classes.title} style={{textAlign: 'left'}}>WePay, one card <br />thousands of benefits</Typography>
                <Typography color='textSecondary'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Exercitationem atque sint asperiores labore hic ad dolor adipisci amet.</Typography>
                  <Box>
                    <List >
                        <Grid container >
                          {
                            benefits.map(item => {
                              return (
                                <Grid key={item.title} item xs={12} lg={6}>
                                  <ListItem>
                                    <ListItemAvatar>
                                      <Avatar className={classes.avatarIcon}>
                                        {item.icon}
                                      </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={<Typography>{item.title}</Typography>} />
                                  </ListItem>
                                </Grid>
                              )
                            })
                          }
                        </Grid>
                    </List>
                  </Box>
          </Grid>
          
          <Hidden mdDown>
            <Grid item lg={6} md={6}>
              <Box>
                <img src={'./images/Credit_Card_3.png'} width={'80%'} style={{marginTop:'-2rem'}} alt='card' />
              </Box>
            </Grid>
          </Hidden>

        </Grid>
      </Box>
    </Container>

    <Box className={classes.divider}>
        <Container>
          <Grid container spacing={5}>
          <Hidden mdDown>
              <Grid item lg={6} md={6} style={{display: 'flex', justifyContent: 'center'}}>
                  <Box display='inline-flex' >
                    <img src={'./images/headset.png'} width={'70%'} height='320px' alt='headset' className={classes.headset}/>
                    <img src={'./images/phone.png'} width={'80%'} height='450px' alt='phone' className={classes.phone}/>
                  </Box>
              </Grid>

          </Hidden>
              <Grid item lg={6} md={6} className={classes.shop}>
                <Typography variant='h4' className={classes.title} style={{textAlign: 'left'}}>Shop with convenience using WePay Card</Typography>
                <Typography paragraph style={{marginBottom: '2rem'}}>Checking out online shouldn't be difficult. That's why our online checkout is easy, smart, and secure - Sign up now.</Typography>
                <Button size='large' color='primary' variant='contained'>Learn More</Button>
              </Grid>
             
          </Grid>
        </Container>
      </Box>

      {/* HOW IT WORKS */}
        <Container>
          <Box >
                <Box textAlign={'center'}>
                  <Typography variant='h4' className={classes.title} >How It Works</Typography>
                  <Typography color='textSecondary' style={{marginBottom: '2rem'}}>The 3 easy steps to registering on WePay.</Typography>
                </Box>

                <Grid container spacing={4} >
                  <Grid item lg={4}>
                      <Card variant='outlined' elevation={0}>
                        <CardContent>
                        <List>
                          <ListItem>
                            <ListItemAvatar>
                              <Avatar className={classes.avatarIcon}>
                                1
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={<Typography variant='h6'>Register</Typography>} secondary={<Typography color='textSecondary'>Register yourself as a WePay application user</Typography>} />
                          </ListItem>
                        </List>
                        </CardContent>
                      </Card>
                  </Grid>
                  <Grid item lg={4}>
                      <Card variant='outlined' elevation={0}>
                        <CardContent>
                        <List>
                          <ListItem>
                            <ListItemAvatar>
                              <Avatar className={classes.avatarIcon}>
                                2
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={<Typography variant='h6'>Upload Documents</Typography>} secondary={<Typography color='textSecondary'>Upload your bank details and other supporting documents to be verified</Typography>} />
                          </ListItem>
                        </List>
                        </CardContent>
                      </Card>
                  </Grid>
                  <Grid item lg={4}>
                      <Card variant='outlined' elevation={0}>
                        <CardContent>
                        <List>
                          <ListItem>
                            <ListItemAvatar>
                              <Avatar className={classes.avatarIcon}>
                                3
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={<Typography variant='h6'>Get Verified</Typography>} secondary={<Typography color='textSecondary'>Become eligible for a loan after your account is verified</Typography>} />
                          </ListItem>
                        </List>
                        </CardContent>
                      </Card>
                  </Grid>
                </Grid>
                 
          </Box>
        </Container>

    </div>
  )
};

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps,{})(Home);
