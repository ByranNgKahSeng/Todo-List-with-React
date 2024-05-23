import React from 'react';
import { FormControl, TextField as MuiTextField, FormHelperText } from '@mui/material';

export default function TextField(props) {
  const { name, label, value, error = null, onChange, ...other } = props;

  return (
    <FormControl variant="outlined" fullWidth style={{width:'100%'}} {...(error && { error: true })}>
      <MuiTextField 
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        {...other}
      />
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
}
