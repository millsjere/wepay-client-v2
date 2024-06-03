import React from 'react'
import { Box, Divider, Stack, Typography } from '@mui/material'
import Logo from '../../assets/images/logo.png'
import { useNavigate } from 'react-router-dom'

const AuthWrapper = ({ children, title, subtitle, image, order, imagePosition }) => {
    const navigate = useNavigate()
    return (
        <div>
            <Box height={'100vh'} display={'flex'} flexDirection={order === 2 ? 'row-reverse' : 'row'}>
                <Box width={{ sm: '50%', md: '45%', lg: '35%' }} p={6} sx={{
                    display: { xs: 'none', sm: 'flex', md: 'flex', lg: 'flex' }, flexDirection: 'column', justifyContent: 'space-between',
                    backgroundSize: 'cover', backgroundImage: `linear-gradient(0deg, rgba(0,0,0,60%), rgba(0,0,0, 12%)), url(${image})`,
                    backgroundPosition: imagePosition || 'center'
                }}>
                    <p></p>
                    <Box p={4} sx={{ color: '#fff', bgcolor: 'rgba(255,255,255, 10%)', borderRadius: '10px', 'backdrop-filter': 'blur(20px)' }}>
                        <Typography variant='h4' mb={2} fontWeight={200}>Get a loan from <br />GHs 1,000 to GHs 20,000</Typography>
                        <Typography variant='body1'>WePay enables you to access creditcard through our partner banks. Credit card services include hire-purchase, direct utility payments POS(Point of Sales) services and cash withdrawals from ATMs.</Typography>
                    </Box>
                </Box>
                <Box width={{ xs: '100%', sm: '50%', lg: '65%' }} sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    p: '2rem'
                }}>
                    <img src={Logo} width={150} alt="logo" style={{ cursor: 'pointer' }} onClick={() => navigate('/')} />
                    <Box width={{ xs: '80%', sm: '80%', md: '80%', lg: '45%' }} textAlign={'center'}>
                        <Typography>{title}</Typography>
                        <Typography>{subtitle}</Typography>
                        {children}
                    </Box>

                    <Stack direction={{ xs: 'column-reverse', sm: 'column-reverse', md: 'row', lg: 'row' }} justifyContent={'space-between'} width={{ xs: '80%', sm: '80%', md: '80%', lg: '50%' }}>
                        <Typography variant='body2' color={'GrayText'} sx={{ textAlign: 'center' }}> © {new Date().getFullYear()} WePay Ghana</Typography>
                        <Stack direction={'row'} justifyContent={'center'} gap={1}>
                            <Typography variant='body2' color={'GrayText'}>About Us</Typography>
                            <Divider orientation='vertical' flexItem />
                            <Typography variant='body2' color={'GrayText'}>Privacy Policy</Typography>
                        </Stack>
                    </Stack>
                </Box>
            </Box>
        </div>
    )
}

export default AuthWrapper