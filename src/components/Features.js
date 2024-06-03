import { Avatar, Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles'
import React from 'react'


const useStyles = makeStyles(theme => ({
    avatar: {
        background: theme.primaryColorOrange,
        padding: '1rem',
        borderRadius: '15px',
        marginBottom: '2rem'
    },
    title :{
        fontSize: '1.2rem',
        fontWeight: 600,
        paddingLeft: '15px',
        borderLeft: `1px solid ${theme.primaryColorOrange}`,
        marginBottom: '1.5rem'
    },
    copy : {
        lineHeight: 1.4
    },
    card : {
        transition: 'all .3s ease',
        border: `1px solid ${theme.primaryColorOrange}`,
        '&:hover': {
            background: '#f0f0f0',
          }
    }
}));


const Features = ({title, copy, icon}) => {
    const classes = useStyles();


  return (
    <Box padding={'2rem'} bgcolor='#fefefe' borderRadius={'15px'} className={classes.card}>
        <Avatar className={classes.avatar}>{icon}</Avatar>
        <Typography className={classes.title} variant='h6'>{title}</Typography>
        <Typography className={classes.copy} variant='body1' color='textSecondary'>{copy}</Typography>
    </Box>
  )
}

export default Features