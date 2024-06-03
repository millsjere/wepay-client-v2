import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Divider, Grid, Typography } from '@material-ui/core';
import React from 'react';
import PageHeader from './dashboard/PageHeader'
import CardImage from '../../assets/images/transaction.png'

const Download = (props) => {


const formDownloads = [
    {bank: 'Zenith Bank', url: '/download'},
    {bank: 'Access Bank', url: '/download'},
    {bank: 'Fidelity Bank', url: '/download'},
    {bank: 'GT Bank', url: '/download'},
    {bank: 'ABSA Bank', url: '/download'},
    {bank: 'Societe Generale Bank', url: '/download'}
]

  return (
      <>
          <PageHeader title={'Downloads'} link2={'Downloads'} user={props.user}/>
          <Typography variant='h6' gutterBottom>Forms - Standing Order </Typography>
          <Divider />

        <Grid container spacing={3} style={{marginTop: '2rem', height: 'auto'}}>
        { formDownloads.map((form) => {
            return (
            <Grid item lg={4} md={6} sm={12} xs={12} key={form.bank}>
                <Card>
                <CardActionArea>
                    <CardMedia src={CardImage} component={'img'} height={'140'} />
                    <CardContent>
                        <Typography variant='h6' gutterBottom>{form.bank}</Typography>
                        <Typography variant='body2' color='textSecondary'>
                            A standing order is an instruction a bank account holder gives to their bank to pay a set amount at regular intervals to another's account. 
                        </Typography>
                    </CardContent>
                </CardActionArea>

                <CardActions> <Button size='small' href={form.url} >Download</Button> </CardActions>
                </Card>
            </Grid>
            )
        })}
            

            
        </Grid>

      </>
  )
};

export default Download;
