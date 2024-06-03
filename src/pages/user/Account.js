import { AppBar, Avatar, Badge, Box, Button, Divider, Hidden, IconButton, InputAdornment, MenuItem, Popover, TextField, Toolbar, Typography } from '@material-ui/core';
import { Search, Notifications, Menu } from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles';
import { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import SideBar from './dashboard/SideBar';
import Overview from './Overview';
import Settings from './Settings';
import Orders from './Payment';
import Download from './Download';
import Profile from './Profile';
import UserNotifications from './Notifications';
import { grey } from '@material-ui/core/colors';
import OrderDetails from './OrderDetails';
import { connect } from 'react-redux';
import Support from './Support';
import { logoutUser, getUserPayment } from '../../actions/actions';
import NotificationItem from '../../components/NotificationItem';
import Payment from './Payment';

const drawerWidth = 260;
const useStyles = makeStyles((theme) => ({
    root : {
      display: 'flex',
      '& .MuiBadge-colorPrimary' : {
        background: theme.backgroundSecondaryDark,
        color: '#fff'
      }
    },
    appbar: {
      [theme.breakpoints.up('sm')]:{
        width: `calc(100% - ${drawerWidth}px)`
      }
    },
    toolbar: {
      display: 'flex',
      background: '#fff'
    },
    drawerIcon: {
      color: '#fff',
      background: theme.primaryColorOrange,
      padding: '.4rem',
      borderRadius: '4px',
      marginRight: '1rem'
    },
    searchInput : {
      color: grey[700],
      border: 'none'
    },
    searchIcon: {
      color: grey[400]
    },
    notify : {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 'auto'
      
    },
    badgeIcon : {
      color: '#c2c2c2',
      '&:hover' :{
        color: theme.backgroundPrimary
      }
    },
    menu : {
      padding: '1rem',
      '& li': {
          borderRadius: '.3rem'
      },
      '& h6': {
          fontSize: '1rem'
      }
    },
      // necessary for content to be below app bar
    toolbarHeight: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: theme.contentBackground,
      padding: theme.spacing(4),
      borderRadius: '10px',
      height: '100vh'
    },

})
)

const Account = (props) => {
  const classes = useStyles()
  const { getUserPayment } = props
  const pathname = useLocation().pathname
  const id = pathname.split('/')[4]
  const [openState, setOpenState] = useState(false)
  const [filter, setFilter] = useState()
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    getUserPayment()
  },[getUserPayment])

  const openDrawerHandle = () => {
    setOpenState(!openState)
  }

  const handleClose = () => {
    setAnchorEl(null);
  }
  const onhandleClick = (e, val) => {
      setAnchorEl(e.currentTarget);
      setFilter(val)

  }

  const renderPage = () => {
    if(props.currentUser && !props.currentUser.verificationCode ){
      return <div className={classes.root}>
      {/* APPBAR */}
        <AppBar elevation={0} position='fixed' className={classes.appbar}>
          <Toolbar className={classes.toolbar}>
                <Hidden smUp>
                  <IconButton className={classes.drawerIcon}  onClick={openDrawerHandle}>
                    <Menu />
                  </IconButton>
                </Hidden>
              <div className={classes.search}>
                <TextField className={classes.searchInput} variant='outlined' type='search' placeholder='Search...' size='small' InputProps={{
                  startAdornment: <InputAdornment position='start'><Search className={classes.searchIcon} fontSize='small' /></InputAdornment>
                }} />
              </div>

            <div className={classes.notify}>
                <Hidden xsDown>
                    <IconButton onClick={(e)=> onhandleClick(e, 'notification')}>
                      <Badge badgeContent={props.notifications.filter(el => el.status === 'unread').length}  color='primary' variant='standard'>
                      <Notifications fontSize='medium' className={classes.badgeIcon} />
                      </Badge>
                    </IconButton>
                     
                </Hidden>
                <IconButton onClick={(e)=> onhandleClick(e, 'profile')}>
                  <Avatar src={props.currentUser.photo ? props.currentUser.photo : ''} />
                </IconButton>

                <Popover open={open} onClose={handleClose} anchorEl={anchorEl} transformOrigin={{vertical: 'top', horizontal: 'right'}} anchorOrigin={{ vertical: 'bottom', horizontal: 'right'}}>
                      { filter === 'notification' &&
                        <Box width={'20rem'}>
                          <div className={classes.menu}>                          
                          <Typography variant='h6'>Notifications ({props.notifications.length})</Typography>
                          </div> 
                          <Divider />     
                          <div className={classes.menu}>
                          { props.notifications.length > 0 ? props.notifications.filter(el => el.status === 'unread').map(item => {
                            return (
                                <NotificationItem key={item._id} 
                                title={item.title} body={item.body}
                                date={new Date(item.createdAt).toDateString()}  
                                />
                            )
                          })
                          : 
                            <Typography color='textSecondary'>You have no unread notifications</Typography>
                          } 
                            </div>
                          
                            <div className={classes.menu}>                          
                            <Button size='small' href='/u/account/notifications' style={{textTransform: 'none', fontSize: '.8rem'}}>View all</Button>
                            </div>
                      </Box>
                      }

                      { filter === 'profile' &&

                      <Box width={'12rem'}>
                          <div className={classes.menu}>                          
                            <Typography variant='h6'>{props.currentUser.name.firstname}</Typography>
                            <Typography variant='body2' color='textSecondary' noWrap>{props.currentUser.email}</Typography>
                          </div> 
                          <Divider />     
                          <div className={classes.menu}>
                              <MenuItem dense onClick={()=>window.location.assign('/')}>Homepage</MenuItem>
                              <MenuItem dense onClick={()=>window.location.assign('/u/account/profile')}>Profile</MenuItem>
                              <MenuItem dense onClick={()=>window.location.assign('/u/account/payment')}>Request Loan</MenuItem>
                              
                          </div>
                          <Divider /> 
                          
                          <div className={classes.menu}>                          
                              <MenuItem dense onClick={()=> props.logoutUser()}>Logout</MenuItem>
                          </div>
                      </Box>

                      }
                  </Popover>
                
            </div>
          </Toolbar>
        </AppBar>

        {/* SIDEBAR DRAWER */}
        <Hidden xsDown >
            <SideBar drawerWidth={drawerWidth} variant='permanent' open={true} user={props.currentUser} />
        </Hidden>

        <Hidden smUp >
            <SideBar drawerWidth={drawerWidth} variant='temporary' open={openState} close={openDrawerHandle} user={props.currentUser} />
        </Hidden>


        {/* MAIN CONTENT */}
          <main className={classes.content}>
          <div className={classes.toolbarHeight} />
          <div className={classes.pageHeader}> </div>

          { pathname === '/u/account/dashboard' ? <Overview user={props.currentUser} /> : null}
          { pathname === '/u/account/settings' ? <Settings user={props.currentUser}  /> : null }
          { pathname === '/u/account/payment' ? <Payment user={props.currentUser} payment={props.payment} card={props.card} /> : null }
          {/* { pathname === `/u/account/payment/${id}/details` ? <OrderDetails id={id}  orders={props.orders.items}  /> : null } */}
          { pathname === '/u/account/downloads' ? <Download user={props.currentUser} /> : null }
          { pathname === '/u/account/profile' ? <Profile user={props.currentUser} /> : null }
          { pathname === '/u/account/notifications' ? <UserNotifications /> : null }
          { pathname === '/u/account/support' ? <Support user={props.currentUser} /> : null }
        </main>
      </div>
    }

    return <> <Navigate to={'/'} /> </>
  }


  return (
    <>
     { renderPage() }
    </>
  )
}


const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps, {logoutUser, getUserPayment})(Account);
