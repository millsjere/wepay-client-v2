import { Box, Breadcrumbs, Container, Link, Typography } from '@material-ui/core'
import { grey } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import CardPolicy from '../components/CardPolicy'
import Modal from '../components/Modal'


const useStyles = makeStyles(theme => ({
    banner : {
        textAlign: 'center',
        padding: '3rem 0',
        marginBottom: '5rem',
        // borderBottom: '1px solid lightgrey',
        background: grey[50]
    },
}))
const Policy = (props) => {

    const classes = useStyles()

  return (
   <>
    <Box className={classes.banner}>
    {/* Modal */}
    { props.modal && <Modal status={props.modal.status} /> }
        <Container>
          <Typography variant='h5'>WePay Card Policy</Typography>
          <Breadcrumbs style={{justifyContent: 'center', alignItems: 'center', display: 'flex', marginTop:'1rem'}}>
            <Link href='/'>Home</Link>
            <Typography>Card Policy</Typography>
          </Breadcrumbs>
        </Container>
      </Box>

        <Container>
            <CardPolicy />
        </Container>
   </>
  )
}

export default Policy