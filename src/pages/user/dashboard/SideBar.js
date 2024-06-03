import { alpha, Avatar, Chip, Collapse, Container, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useNavigate, useLocation } from 'react-router-dom';
import { AccountBox, CloudDownload, Dashboard, Forum, KeyboardArrowDown, Notifications, Payment, PowerSettingsNew, Receipt, Settings } from '@material-ui/icons';
import { useState } from 'react';
import {connect} from 'react-redux'
import { logoutUser } from '../../../actions/actions';


const useStyles = makeStyles((theme) => ({
  root : {
    '& .MuiDivider-root': {
        background: alpha(theme.primaryColorBlue, 0.2)
    },
    },
  logo : {
    fontSize: '25px',
    fontWeight: 100,
    textAlign: 'center',
    color: '#fff',
    padding: '5px 0',
    margin: '10px 0',
    '& span': {
      fontWeight: 600,
      color: theme.primaryColorOrange
    }
  },
  drawer : (props) => ({
    width: props.drawerWidth
  }),
  drawerPaper: (props) => ({
    width: props.drawerWidth,
    background: theme.secondaryColorDark2
  }),
  activeMenu : {
    background: alpha(theme.primaryColorBlue, 0.2)
  },

  menuTitle :{
    color: 'rgb(107, 114, 128)', 
  },
  menuList: {
    margin: '10px 0',
  },
  menuItem : {
    borderRadius: '8px',
    gap: 15,
    margin: '5px 0',
    '&:hover' :{
      background: alpha(theme.primaryColorBlue, 0.2)
    },
  },
  menuIcon: {
    fontSize: '13px',
    color: '#9ca3af',
    minWidth: 'auto'
  },
  subMenuIcon: {
    fontSize: '20px',
    color: '#9ca3af',
    minWidth: 'auto'
  },
  menuText : {
    '& p': {
      color: "#9ca3af"
    }
  },
  subMenuText : {
    '& p': {
      color: "#9ca3af",
      fontSize: '14px',
      marginLeft: '30px'
    }
  },
  userProfile : {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '30px 0'
  },
  userImage : {
    width: theme.spacing(12),
    height: theme.spacing(12),
    marginBottom: '10px',
  },
  userName : {
    color: '#fff'
  }, 
  userTitle : {
    color: 'rgb(107, 114, 128)'
  },
  chip: {
    height: '20px',
    '& .MuiChip-label':{
      padding: '2px 7px',
      fontSize: '10px'
    }
  },
  account : {
    
  },
    // necessary for content to be below app bar
    toolbarHeight: theme.mixins.toolbar,
}))


const SideBar = (props) => {

  const [openMenu1, setOpenMenu1] = useState(false)
  const [openMenu2, setOpenMenu2] = useState(false)

  const pathname = useLocation().pathname
  const classes = useStyles(props)
  const navigate = useNavigate()

const menuItemsGeneral = [
  { name: 'Overview', icon: <Dashboard fontSize='small' />, path: '/u/account/dashboard' },
  { name: 'Loan/Payment', icon: <Receipt fontSize='small' />, path: '/u/account/payment' },
  { name: 'Transactions', icon: <Payment fontSize='small' />, path: '#' },
]

const menuItemsManagement = [
  { name: 'Downloads', icon: <CloudDownload fontSize='small' />, path: '/u/account/downloads' },
  { name: 'Account', icon: <AccountBox fontSize='small' />, path: '/u/account/profile' },
  { name: 'Notifications', icon: <Notifications fontSize='small' />, path: '/u/account/notifications' },
  { name: 'Settings', icon: <Settings fontSize='small' />, path: '/u/account/settings' },
]

const menuItemsSupport = [
  { name: 'Support', icon: <Forum fontSize='small' />, path: '/u/account/support' },
  { name: 'Logout', icon: <PowerSettingsNew fontSize='small' />, path: '/logout' },
]

const menuDropDown = (item) => {
  if(item.sub && item.name === 'Store'){
    setOpenMenu2(!openMenu2)
    return
  }
  if(item.sub && item.name === 'Users'){
    setOpenMenu1(!openMenu1)
    return
  }
  else{
    navigate(item.path)
  }
}

const onLogout =() => {
  props.logoutUser()
}


  return (
    <Drawer variant={props.variant} 
      open={props.open} className={`${classes.drawer} ${classes.root}`} 
      classes={{ paper: classes.drawerPaper }} 
      onClose={props.close} ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
      >
            {/* <div className={classes.toolbarHeight} /> */}
            <Typography className={classes.logo} variant='h4'>wepay<span>gh</span></Typography>
            <Divider className={classes.dividers} />
            <Container>
              <div className={classes.userProfile}>
                <Avatar className={classes.userImage} src={props.user.photo && props.user.photo} />
                <Typography variant='h6' className={classes.userName}>{props.user.fullname}</Typography>
                <Typography variant='body2' color='textSecondary' className={classes.userTitle}>{props.user.email}</Typography>
                <Typography variant='body2' color='textSecondary' className={classes.userTitle}>Customer</Typography>
              </div>
            </Container>
            <Divider />
            <Container>
                <List className={classes.menuList}>
                <Typography className={classes.menuTitle} variant='body2'>GENERAL</Typography>
                    { menuItemsGeneral.map((item, index) => {
                      return (
                        <ListItem onClick={()=> navigate(item.path)  } key={item.name} button className={`${classes.menuItem} ${ pathname === item.path ? classes.activeMenu : null }`} alignItems='center'>
                          <ListItemIcon className={classes.menuIcon}>{item.icon}</ListItemIcon>
                          <ListItemText className={classes.menuText} secondary={item.name} />
                          { index > 0 && <Chip label='new' color='primary' className={classes.chip} />}
                          
                        </ListItem>
                        )
                      })
                    }
                </List>
                <List className={classes.menuList} component='div'>
                <Typography className={classes.menuTitle} variant='body2'>MANAGEMENT</Typography>
                    { menuItemsManagement.map((item) => {
                      return (
                        <div key={item.name}>
                          <ListItem onClick={()=>menuDropDown(item)}  button className={`${item.name === 'Account' && classes.account} ${classes.menuItem} ${ pathname === item.path ? classes.activeMenu : null } ${ item.sub && pathname.startsWith(item.path) ? classes.activeMenu : null }`} alignItems='center'>
                            <ListItemIcon className={classes.menuIcon}>{item.icon}</ListItemIcon>
                            <ListItemText className={classes.menuText}  secondary={item.name} />
                            { item.sub ? <KeyboardArrowDown className={classes.subMenuIcon} /> : null }
                          </ListItem>
                            { item.sub && item.sub.map((sub) => {
                              if(item.name === 'Users'){
                                return (
                                  <Collapse component='div' in={openMenu1} timeout="auto" key={sub.name}>
                                    <List disablePadding>
                                      <ListItem onClick={()=> navigate(sub.path)} button className={classes.menuItem}>
                                        <ListItemText className={classes.subMenuText} secondary={sub.name}/>
                                      </ListItem>
                                    </List>
                                  </Collapse> 
                                )
                              }else {
                                return (
                                  <Collapse component='div' in={openMenu2} timeout="auto" key={sub.name}>
                                    <List disablePadding>
                                      <ListItem onClick={()=> navigate(sub.path)} button className={classes.menuItem}>
                                        <ListItemText className={classes.subMenuText} secondary={sub.name}/>
                                      </ListItem>
                                    </List>
                                  </Collapse> 
                                )
                              }
                            })
                            
                            }
                        </div>
                        )
                      })
                    }
                </List>
                <List className={classes.menuList}>
                <Typography className={classes.menuTitle} variant='body2'>SUPPORT</Typography>
                    { menuItemsSupport.map((item) => {
                      return (
                        <ListItem onClick={( item.name === 'Logout' ? ()=>onLogout() : ()=>navigate(item.path) )} key={item.name} button className={`${classes.menuItem} ${ pathname === item.path ? classes.activeMenu : null }`} alignItems='center'>
                          <ListItemIcon className={classes.menuIcon}>{item.icon}</ListItemIcon>
                          <ListItemText className={classes.menuText}  secondary={item.name} />
                        </ListItem>
                        )
                      })
                    }
                </List>
              </Container>
            </Drawer>
  )
};

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps, {logoutUser})(SideBar);
