import React from 'react';
import { TextField, Grid, InputAdornment, IconButton } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const Input = ({ value, name, label, half, type, autoFocus, handleChange, error, helperText, handleShowCvv}) => {
    return (
        <Grid item xs={12} sm={half ? 6 : 12}>
            <TextField 
            name={name}
            type={type}
            onChange={handleChange}
            autoFocus={autoFocus}
            error={error}
            value={value}
            helperText={helperText}
            label={label}
            fullWidth 
            required 
            variant="outlined"
                InputProps={name === 'cvv' ? {
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={handleShowCvv}>
                                {type === 'password' ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    ),
                } : null}
            />
        </Grid>
    )
}

export default Input
