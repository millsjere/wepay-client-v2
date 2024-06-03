import { Box, Typography, Link } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating'
import { makeStyles } from '@material-ui/styles';
import React from 'react';




const useStyles = makeStyles((theme) => ({
    wrap: {
        paddingBottom: '2rem'
    },
    title : {
        color: '#000',
        fontWeight: 500
    },
    imageWrap : {
        border: '1px solid lightgrey',
        padding: '1rem',
        marginBottom: '1rem',
        '& img': {
            width: '90%'
        }
    }
}))


const ProductItem = (props) => {
    const classes = useStyles(); 
    const link = `/shop/${props.category}/${props.id}`

  return (
    <div className={classes.wrap}>
            <Box  className={classes.imageWrap} >
                <img src={props.image} alt={props.name}/>
            </Box>
            
            <Rating size="small" readOnly defaultValue={4} />
            <Link underline='none' href={link.toLowerCase()}><Typography noWrap gutterBottom className={classes.title} variant='body1' >{props.name} </Typography> </Link> 
            <Typography color="textSecondary">Gh¢{props.price.oneMonth.toLocaleString()} - Gh¢{(props.price.sixMonths * 6).toLocaleString()}</Typography>
       
    </div>
  )
};

export default ProductItem;
