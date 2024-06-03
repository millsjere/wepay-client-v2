import { Box, Button, Card, CardContent, Container, Typography } from '@material-ui/core'
import { CheckCircle } from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'
import React from 'react'


const useStyles = makeStyles(theme => ({
    wrap: {
        width: '500px',
        padding: '3rem',
        margin: '4rem auto'
    },
    card : {
        padding: '2rem'
    },
    icon : {
        fontSize: '4rem',
        marginBottom: '1rem'
    }
}))

const Order = () => {
    const classes = useStyles()



  return (
    <div>
    <Container>

        <Box className={classes.wrap}>
            <Card variant='outlined' className={classes.card}>
                <CardContent style={{textAlign: 'center'}}>
                    <CheckCircle color='primary' className={classes.icon} />
                    <Typography variant='h5' gutterBottom>Order Successful</Typography>
                    <Typography paragraph>Thank you for shopping with us. Your order was successful. Please find details in your dashboard</Typography>
                    <Button variant='contained' disableElevation color='secondary' style={{marginRight: '1rem'}} href='/'> Continue Shopping</Button>
                    <Button variant='contained' disableElevation color='primary' href='/u/account/orders'> View Order Details</Button>
                </CardContent>
            </Card>
            </Box>

    </Container>
    </div>
  )
}

export default Order