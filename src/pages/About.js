import React from 'react';
import {makeStyles} from '@material-ui/styles'
import { Box, Breadcrumbs, Container, Link, Typography } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  banner : {
    textAlign: 'center',
    padding: '3rem 0',
    marginBottom: '5rem',
    // borderBottom: '1px solid lightgrey',
    background: grey[50]
},
}))


const About = () => {
  const classes = useStyles()


  return <>
    <Box className={classes.banner}>

        <Container>
          <Typography variant='h5'>About WePay</Typography>
          <Breadcrumbs style={{justifyContent: 'center', alignItems: 'center', display: 'flex', marginTop:'1rem'}}>
            <Link href='/'>Home</Link>
            <Link href='/about'>About</Link>
            <Typography>WePayGh</Typography>
          </Breadcrumbs>
        </Container>
      </Box>
  </>
};

export default About;
