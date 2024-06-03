import React from 'react'
import { styled } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton';

const StyledButton = styled(LoadingButton)(({ theme }) => ({
  padding: '.6rem 1rem',
  borderRadius: '6px'
}))

const RoundButton = ({ text, onClick, variant, disableElevation, fullWidth, size, sx, color, loading, disable }) => {
  return (
    <StyledButton
      loading={loading}
      sx={sx} color={color}
      onClick={onClick} variant={variant}
      disableElevation={disableElevation}
      fullWidth={fullWidth}
      size={size}
      disabled={disable}
    >
      {text}
    </StyledButton>
  )
}

export default RoundButton