import { Button, Card, CardContent, Chip, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, InputAdornment, TextField, Typography } from '@material-ui/core'
import { DataGrid } from '@material-ui/data-grid'
import { Search, Visibility } from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'
import React, { useState } from 'react'
import PageHeader from './dashboard/PageHeader'
import {connect} from 'react-redux'
import { markAsRead } from '../../actions/actions'

const useStyles = makeStyles(theme => ({

}));


const Notifications = (props) => {
    const classes = useStyles()
    const [pageSize, setPageSize] = useState(5)
    const [open, setOpen] = useState(false)
    const [notify, setNotify] = useState({})

    const viewNotification =(id)=>{
        const view = props.notifications.filter(item => item.id === id);
        setNotify(view[0])
        setOpen(true)
        props.markAsRead(id)
    }

  const columns = [
    {field: 'title', headerName: 'Title', flex: 1}, 
    {field: 'body', headerName: 'Message',flex: 1.5}, 
    {field: 'createdAt', headerName: 'Date & Time',flex: 1, renderCell: (params) => { return `${new Date(params.value).toDateString()} at ${new Date(params.value).toLocaleTimeString()}`} },
    {field: 'status', headerName:' Status',flex: .5, renderCell: (params) => { return <Chip disabled label={params.value} />} },
    {field: 'id', headerName:' Action',flex: .5, renderCell: (params) => { return <><IconButton onClick={()=>viewNotification(params.value)} ><Visibility fontSize='small' /></IconButton> </>}}
  ]

  return (
    <div>
        <PageHeader title={'Notifications'} link2={'notifications'} />

        <Card variant='outlined' style={{ borderRadius: '10px', width: '100%'}} className={classes.root}>
        <CardContent style={{ padding:'30px' }}>
            <TextField  variant='outlined' style={{ marginBottom: '20px'}}
            placeholder='Find a notification' fullWidth
            InputProps={{ 
              startAdornment: <InputAdornment position='start'><Search fontSize='small' /> </InputAdornment>
              }}/>
            <DataGrid autoHeight isRowSelectable={(GridRowParams)=> false}
              pagination rows={props.notifications} rowsPerPageOptions={[5, 10, 15, 20]}
              rowHeight={70} columns={columns} 
              pageSize={pageSize} checkboxSelection 
              onPageSizeChange={(newSize)=> setPageSize(newSize)}
              />

        </CardContent>
      </Card>

      <Dialog open={open}>
          <DialogTitle>
              <Typography style={{fontSize: '1.3rem', fontWeight: 600}}>{notify.title}</Typography>
              <Typography variant='body2' color='textSecondary'>{`${new Date(notify.createdAt).toDateString()} at ${new Date(notify.createdAt).toLocaleTimeString()}`}</Typography>
          </DialogTitle>
          <DialogContent dividers>
            <Typography variant='body1'>{notify.body}</Typography>
          </DialogContent>
          <DialogActions>
              <Button onClick={()=>setOpen(false)}>Close</Button>
          </DialogActions>
      </Dialog>
    </div>
  )
}

const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps, {markAsRead})(Notifications)