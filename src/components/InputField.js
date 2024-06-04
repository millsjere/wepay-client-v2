import { TextField } from '@mui/material'
import { styled } from '@mui/styles'
import React from 'react'

const StyledInputField = styled(TextField)(({ theme }) => ({
    marginBottom: '1rem',
    '& *': {
        borderRadius: '6px'
    },
    '& label.Mui-focused': {
        color: theme.primaryColorOrange
    },
    "& .MuiOutlinedInput-root": {
        borderRadius: '10px',
        "&.Mui-focused fieldset": {
            border: `1px solid ${theme.primaryColorOrange}`
        }
    }
}))

const InputField = ({ sx, isSelect, variant, value, onChange, isRequired, label, error, children, type, InputProps, inputProps, placeholder }) => {
    return (
        <StyledInputField sx={sx}
            type={type} size='medium'
            variant={variant}
            value={value}
            onChange={onChange}
            required={isRequired}
            label={label}
            helperText={error?.text}
            error={error?.isError}
            select={isSelect}
            fullWidth
            InputProps={InputProps}
            inputProps={inputProps}
            placeholder={placeholder}
        >
            {children}
        </StyledInputField>
    )
}

export default InputField