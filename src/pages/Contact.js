import { Button, Container, Grid, Typography, Box, Accordion, AccordionSummary, AccordionDetails, Breadcrumbs, Link } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { Email, KeyboardArrowDown, Phone, WhatsApp } from '@material-ui/icons';
import { makeStyles, withStyles } from '@material-ui/styles';
import React from 'react';


const useStyles = makeStyles(theme => ({
  btn : {
    marginBottom: '1rem',
    height: '4rem'
  },
  banner : {
    textAlign: 'center',
    padding: '3rem 0',
    marginBottom: '5rem',
    background: grey[100]
  },
  wrap : {
    '& h5' : {
      fontWeight: 500,
      fontSize: '1.5rem',
      marginBottom: '1rem'
    },
    '& h6' : {
      fontWeight: 500,
      marginTop: '.5rem',
      marginBottom: '1rem'
    }
  },
  faq : {
    '& h6' : {
      fontWeight: 400,
      fontSize : '1.1rem'
    }
  }
}))

const MuiAccordion = withStyles({
  root: {
   
    borderTop: '1px solid rgba(0, 0, 0, .125)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(Accordion);

const MuiAccordionSummary = withStyles(theme => ({
  root: {
    backgroundColor: '#ff',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 85,
    '&$expanded': {
      minHeight: 86,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {
    color: theme.primaryColorOrange
  },
}))(AccordionSummary);

const MuiAccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
}))(AccordionDetails);

const Contact = () => {

const classes = useStyles()
const [expanded, setExpanded] = React.useState('panel1');
const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <>
      {/* PAGE BANNER */}
      <Box className={classes.banner}>
        <Container>
          <Typography variant='h5'>Our Support</Typography>
          <Breadcrumbs style={{justifyContent: 'center', alignItems: 'center', display: 'flex', marginTop:'1rem'}}>
            <Link href='/'>Home</Link><Typography>Contact</Typography>
          </Breadcrumbs>
        </Container>
      </Box>
      <Container>
      <Grid container spacing={7} className={classes.wrap}>
        <Grid item sm={3}>
          <Typography variant='h5' component='h6'>Do you still need help?</Typography>
          <Typography variant='body2' style={{marginBottom: '2rem'}} color='textSecondary' paragraph>Get access to support whenever you need (24/7).</Typography>

          <Button className={classes.btn}  startIcon={<Email />} variant='outlined' fullWidth>Email</Button>
          <Button className={classes.btn} startIcon={<WhatsApp />} variant='outlined' target={'_blank'} href={"https://api.whatsapp.com/send?phone=+233207760982"} fullWidth>WhatsApp</Button>
          <Button className={classes.btn} startIcon={<Phone />} variant='outlined' href={'tel:+233207760982'} fullWidth>Call Us</Button>

          <Box>
          <Typography variant='h5' component='h6'>Locate Us</Typography>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3971.0405467511555!2d-0.18632648496896045!3d5.561008995968072!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf907f70704c2f%3A0x3e242934cce0c052!2sForbes%20Microfinance%20Ltd!5e0!3m2!1sen!2sgh!4v1644420997746!5m2!1sen!2sgh" width="95%" height="350" title='Locate us' style={{border:'1px solid lightgrey', padding:'.5rem', marginTop: '1rem'}} allowfullscreen="" loading="lazy"></iframe>
          </Box>
        </Grid>

        <Grid item sm={9}>

        <Typography variant='h5' component='h5' gutterBottom>Frequently Asked Questions (FAQs)</Typography>
        <Box className={classes.faq}>
          <MuiAccordion square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
            <MuiAccordionSummary expandIcon={<KeyboardArrowDown />}><Typography variant='h6'>How can I register on WePayGh </Typography></MuiAccordionSummary>
            <MuiAccordionDetails>
              <Typography>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint earum enim, animi temporibus vel magni veritatis, dolore minima, 
                accusantium accusamus voluptatibus vitae dolorum corporis nihil quas! Nobis molestias commodi recusandae!
              </Typography>
            </MuiAccordionDetails>
          </MuiAccordion>

          <MuiAccordion square expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
            <MuiAccordionSummary expandIcon={<KeyboardArrowDown />}><Typography variant='h6'>How can I register on WePayGh </Typography></MuiAccordionSummary>
            <MuiAccordionDetails>
              <Typography>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint earum enim, animi temporibus vel magni veritatis, dolore minima, 
                accusantium accusamus voluptatibus vitae dolorum corporis nihil quas! Nobis molestias commodi recusandae!
              </Typography>
            </MuiAccordionDetails>
          </MuiAccordion>

          <MuiAccordion square expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
            <MuiAccordionSummary expandIcon={<KeyboardArrowDown />}><Typography variant='h6'>How can I register on WePayGh </Typography></MuiAccordionSummary>
            <MuiAccordionDetails>
              <Typography>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint earum enim, animi temporibus vel magni veritatis, dolore minima, 
                accusantium accusamus voluptatibus vitae dolorum corporis nihil quas! Nobis molestias commodi recusandae!
              </Typography>
            </MuiAccordionDetails>
          </MuiAccordion>

          <MuiAccordion square expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
            <MuiAccordionSummary expandIcon={<KeyboardArrowDown />}><Typography variant='h6'>How can I register on WePayGh </Typography></MuiAccordionSummary>
            <MuiAccordionDetails>
              <Typography>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint earum enim, animi temporibus vel magni veritatis, dolore minima, 
                accusantium accusamus voluptatibus vitae dolorum corporis nihil quas! Nobis molestias commodi recusandae!
              </Typography>
            </MuiAccordionDetails>
          </MuiAccordion>

          <MuiAccordion square expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
            <MuiAccordionSummary expandIcon={<KeyboardArrowDown />}><Typography variant='h6'>How can I register on WePayGh </Typography></MuiAccordionSummary>
            <MuiAccordionDetails>
              <Typography>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint earum enim, animi temporibus vel magni veritatis, dolore minima, 
                accusantium accusamus voluptatibus vitae dolorum corporis nihil quas! Nobis molestias commodi recusandae!
              </Typography>
            </MuiAccordionDetails>
          </MuiAccordion>

          <MuiAccordion square expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
            <MuiAccordionSummary expandIcon={<KeyboardArrowDown />}><Typography variant='h6'>How can I register on WePayGh </Typography></MuiAccordionSummary>
            <MuiAccordionDetails>
              <Typography>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint earum enim, animi temporibus vel magni veritatis, dolore minima, 
                accusantium accusamus voluptatibus vitae dolorum corporis nihil quas! Nobis molestias commodi recusandae!
              </Typography>
            </MuiAccordionDetails>
          </MuiAccordion>

          <MuiAccordion square expanded={expanded === 'panel7'} onChange={handleChange('panel7')}>
            <MuiAccordionSummary expandIcon={<KeyboardArrowDown />}><Typography variant='h6'>How can I register on WePayGh </Typography></MuiAccordionSummary>
            <MuiAccordionDetails>
              <Typography>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint earum enim, animi temporibus vel magni veritatis, dolore minima, 
                accusantium accusamus voluptatibus vitae dolorum corporis nihil quas! Nobis molestias commodi recusandae!
              </Typography>
            </MuiAccordionDetails>
          </MuiAccordion>

        </Box>

          
        </Grid>
      </Grid>

      </Container>
    </>

  )
};

export default Contact;
