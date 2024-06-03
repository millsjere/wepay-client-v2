import React from 'react'
import PageHeader from './dashboard/PageHeader'
import { connect, useSelector } from 'react-redux'
import Modal from '../../components/Modal'
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import TransImage from '../../assets/images/transaction.png'
import Template from '../../components/Template'
import { PDFDownloadLink} from '@react-pdf/renderer';
import {  useNavigate } from 'react-router-dom'


const Downloads = (props) => {
    const currentUser = useSelector(state => state.currentUser)
    const navigate = useNavigate()

  return (
    <div>
         <PageHeader title={'Downloads'} link2={'Downloads'} user={props.user}/>
          {/* MODAL  */}
         { props.modal && <Modal status={props.modal.status} />}

         <Card elevation={0} sx={{bgcolor: 'transparent'}}>
            <CardContent>
                
                <Grid container>
                    <Grid item xs={12} sm={3} >
                        <Card>
                            <CardMedia
                                sx={{ height: 180 }}
                                image={TransImage}
                                title="Direct Debit Form"
                            />
                            <CardContent sx={{padding: '1.5rem'}}>
                                <Typography gutterBottom variant="h6" component="div">
                                Standing Order Form
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                Download and fill out this form to submit during loan request. 
                                </Typography>
                            </CardContent>
                            <CardActions sx={{p: '1rem'}}>
                                
                                <PDFDownloadLink document={<Template currentUser={currentUser} />} fileName="wepaygh_direct_debit.pdf">
                                    {({ blob, url, loading, error, }) =>
                                            loading ? <Typography >Upload profile photo to download</Typography> : <Button color='secondary' variant='contained' onClick={()=> {localStorage.setItem('download', true); navigate('/u/account/documents')}} >Download</Button>
                                    }
                                </PDFDownloadLink>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </CardContent>
         </Card>

         
    </div>
  )
}

const mapStateToProps = (state) => {
    return state
  }

export default connect(mapStateToProps, {})(Downloads)