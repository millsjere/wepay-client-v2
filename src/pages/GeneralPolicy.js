import { Box, Breadcrumbs, Container, Link, Typography } from '@material-ui/core'
import { grey } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import Modal from '../components/Modal'
import PrivacyPolicy from '../components/PrivacyPolicy'


const useStyles = makeStyles(theme => ({
    banner : {
        textAlign: 'center',
        padding: '3rem 0',
        marginBottom: '5rem',
        // borderBottom: '1px solid lightgrey',
        background: grey[50]
    },
}))
const GeneralPolicy = (props) => {

    const classes = useStyles()

  return (
   <>
    <Box className={classes.banner}>
    {/* Modal */}
    { props.modal && <Modal status={props.modal.status} /> }
        <Container>
          <Typography variant='h5'>Privacy Policy</Typography>
          <Breadcrumbs style={{justifyContent: 'center', alignItems: 'center', display: 'flex', marginTop:'1rem'}}>
            <Link href='/'>Home</Link>
            <Typography>Privacy Policy</Typography>
          </Breadcrumbs>
        </Container>
      </Box>

        <Container>
            <PrivacyPolicy />
        </Container>
   </>
  )
}

export default GeneralPolicy