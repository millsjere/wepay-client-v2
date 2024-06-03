import { AppBar, Avatar, Box, Button, Chip, Container, Divider, Hidden, IconButton, Link, MenuItem, Popover, Toolbar, Typography } from '@material-ui/core';
import { Search } from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Logo from '../assets/images/logo.png'
import { connect } from 'react-redux';
import { authRequest, logoutUser } from '../actions/actions';


const useStyles = makeStyles(theme => ({
    root : {
        '& .MuiContainer-root': {
            background: theme.secondaryColorDark
        },
        '& .MuiBadge-anchorOriginTopRightCircular' : {
            top : '23%',
            right: '23%',
            color: '#000'
        },
        '& .MuiBadge-colorSecondary':{
            background: theme.primaryColorOrange
        },
        '& .MuiChip-outlined' : {
            border: 'none',
            marginLeft: '.5rem'
        },
        '& .MuiChip-label' : {
            color: '#fff'
        },
        '& .MuiPopover-paper' : {
            borderRadius: '1rem'
        }
    },
    appbar : {
        background: 'transparent'
    },
    toolbar: {
        height: '96px',
        background: 'transparent',
    },
    topbar: {

    },
    navbar : {
        display: 'flex',
        gap: theme.spacing(3),
        alignItems: 'center',
        justifyContent: 'space-between',
        '& a' : {
            marginLeft: theme.spacing(4)
        }
    },
    logo : {
        width:'150px'
    },
    notify : {
        // marginLeft: 'auto',
       '& .MuiSvgIcon-root' : {
           color: '#fff'
       }
    },
    register: {
        color: '#fff',
        borderColor: '#fff',
        marginLeft: '5px !important',
    },
    login: {
        color: '#fff',
        margin: '0 8px !important'
    },
    links : {
        color: '#fff',
        '& a:hover': {
            color: theme.primaryColorOrange
        }
    },
    menu : {
        width: '9rem',
        padding: '.8rem',
    '& li': {
        borderRadius: '.3rem'
    },
    '& h6': {
        fontSize: '1rem'
    }
    },
    photo: {
        width: theme.spacing(7),
        height: theme.spacing(7),
      }
}))
const Navbar = (props) => {

    const { authRequest } = props
    const classes = useStyles()
    const  path = useLocation()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

  
    // Get User Auth & Fetch All Products into store
    useEffect(() => {
        authRequest()
    }, [authRequest])

    const handleClose = () => {
        setAnchorEl(null);
    }
    const onhandleClick = (e) => {
        setAnchorEl(e.currentTarget);
    }
    const toDashboard = (link) => {
        if(props.currentUser.verificationCode){
            window.location.assign('/auth/verify')
        }else{
                window.location.assign(`/u/account/${link}`)        
        }
    }

  return (
      <Box style={{background: props.bg}} >
      <Box className={classes.topbar}>

      </Box>
      <AppBar elevation={0} position='static' className={classes.appbar}>
          <Toolbar className={`${classes.toolbar}`}>
          <Container className={classes.root} style={{padding:0}}>
                <Box className={`${classes.navbar}`}>
                    

                    { path.pathname.startsWith('/auth/') ? null 
                    : 
                    <Hidden smDown>
                        <Typography className={classes.links}> 
                            <Link color='inherit' underline='none' href='/'>Home</Link>
                            <Link color='inherit' underline='none' href='/shop'>Partner Store</Link>
                            <Link color='inherit' underline='none' href='/contact'>Contact</Link>
                        </Typography>
                    </Hidden>
                    }

                    <div>
                    <Link href='/' style={{marginLeft: 0}}>
                        <img className={classes.logo} src={Logo} alt="logo" />
                    </Link>
                    </div>

                    <div className={classes.notify}>
                        { path.pathname.startsWith('/auth/') ?  
                        <Typography color='textSecondary'> <Link href='/contact' color='inherit' underline='none'> Support </Link></Typography> 
                        :
                        <>
                            <Hidden smDown>
                                <IconButton href='/search' style={{margin: 0}}>
                                    <Search />
                                </IconButton>
                            </Hidden>
                            {/* <Badge color='secondary' showZero badgeContent={props.cart ? props.cart.items.length : 0} overlap='circular'>
                                <IconButton href='/cart' style={{margin: 0}}>
                                    <LocalMall />
                                </IconButton>
                            </Badge>
                             */}
                            { props.currentUser ? 
                                <>
                                    <Chip avatar={<Avatar src={props.currentUser.photo ? props.currentUser.photo : null} />} variant='outlined' label={<Typography>My Account</Typography>} onClick={(e)=> onhandleClick(e)}  /> 
                                        <Popover open={open} onClose={handleClose} anchorEl={anchorEl} transformOrigin={{vertical: 'top', horizontal: 'right'}} anchorOrigin={{ vertical: 'bottom', horizontal: 'right'}}>
                                            <div className={classes.menu} >
                                                <Typography variant='h6'>{`${props.currentUser.name.firstname}`}</Typography>
                                                <Typography gutterBottom variant='body2' color='textSecondary' noWrap>{props.currentUser.email}</Typography>
                                            </div>
                                            <Divider />
                                            <div className={classes.menu}>
                                                <MenuItem dense onClick={()=> toDashboard('dashboard')}>Dashboard</MenuItem>
                                                <MenuItem dense onClick={()=> toDashboard('settings')}>Settings</MenuItem>
                                                <MenuItem dense onClick={()=> window.location.assign('https://oakexpressgh.com')}>Partner Store</MenuItem>
                                            </div>
                                            <Divider />
                                            <div className={classes.menu}>                          
                                                <MenuItem dense onClick={()=> props.logoutUser()} >Logout</MenuItem>
                                            </div>

                                        </Popover>
                                </>
                                : <Button href='/auth/login' className={classes.login} disableElevation variant='text'>Login</Button>
                            }
                            { props.currentUser ? null : <Button href='/auth/register'  className={classes.register} disableElevation variant='outlined'>Register</Button> }
                            
                        </>
                        }
                    </div>

                </Box>
            </Container>
          </Toolbar>
      </AppBar>
      </Box>
    
  )
};

const mapStateToProps = (state) => {
    //console.log(state)
    return state
}

export default connect(mapStateToProps, {authRequest, logoutUser})(Navbar);
