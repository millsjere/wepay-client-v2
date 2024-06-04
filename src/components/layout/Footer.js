import { Box, Typography } from '@mui/material'
import React from 'react'

const Footer = () => {
    return (
        <Box mt={8} py={4} pl={3} bgcolor={'#ededed'}>
            <Typography>
                Developed by <a href="https://wepaygh.com/" target="_blank" rel="noreferrer" className="text-black-50 no-underline">WePay Ghana</a>
            </Typography>
        </Box>
    )
}

export default Footer