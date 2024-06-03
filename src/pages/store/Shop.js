import React from 'react';
import {makeStyles} from '@material-ui/styles'
import { Box, Breadcrumbs, Button, Container, Grid, Link, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import Modal from '../../components/Modal';
import { grey } from '@material-ui/core/colors';
import Credit from '../../assets/images/Credit_Card_3.png'

const useStyles = makeStyles(theme => ({
  banner : {
    textAlign: 'center',
    padding: '3rem 0',
    marginBottom: '5rem',
    // borderBottom: '1px solid lightgrey',
    background: grey[50]
},
  title: {
    fontWeight: 600
  }
}))

const Shop = (props) => {
  const classes = useStyles()

  return <>
    <Box className={classes.banner}>
    {/* Modal */}
    { props.modal && <Modal status={props.modal.status} /> }
        <Container>
          <Typography variant='h5'>Partner Stores</Typography>
          <Breadcrumbs style={{justifyContent: 'center', alignItems: 'center', display: 'flex', marginTop:'1rem'}}>
            <Link href='/'>Home</Link>
            <Link href='/shop'>Shop</Link>
            <Typography>Partner Stores</Typography>
          </Breadcrumbs>
        </Container>
      </Box>

      <Container>
        <Grid container>
          <Grid item lg={3}>

          </Grid>

          <Grid item lg={9}>
            <Box padding='3rem' display='flex' gridGap={'1rem'} bgcolor='#3EB7E4' borderRadius={'10px'} color='#fff'>
              <Grid container>
                  <Grid item lg={6} style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
                    <Typography variant='h5' className={classes.title} gutterBottom>Shop with ease using WePay Card</Typography>
                    <Typography paragraph>Complete stack for all your payments needs across channels such as ecommerce stores</Typography>
                    <Button variant='contained' disableElevation color='primary' style={{color:'#fff'}}>Signup Now</Button>
                  </Grid>

                  <Grid item lg={6}>
                    <img style={{marginTop: '-9rem'}} width={'100%'} src={Credit} alt='wepay-card'/>
                  </Grid>

                </Grid>

            </Box>

            <Typography varaint='h4' gutterBottom>Latest Products</Typography>

          </Grid>
        </Grid>
      </Container>

  </>
};

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps, {})(Shop)
